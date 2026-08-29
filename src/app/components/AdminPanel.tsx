import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { X, Plus, Edit, Trash2, LogOut, Download, Search, MessageSquare, CheckCircle, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import {
  BlogPost,
  PortfolioItem,
  CourseRegistration,
  addBlogPost,
  updateBlogPost,
  deleteBlogPost,
  addPortfolioItem,
  updatePortfolioItem,
  deletePortfolioItem,
  getRegistrations,
  deleteRegistration,
  updateRegistrationStatus
} from '../../lib/firestore';

interface AdminPanelProps {
  onClose: () => void;
  onLogout: () => void;
  blogPosts: BlogPost[];
  portfolioItems: PortfolioItem[];
  onRefresh: () => void;
}

export function AdminPanel({
  onClose,
  onLogout,
  blogPosts,
  portfolioItems,
  onRefresh,
}: AdminPanelProps) {
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [editingPortfolio, setEditingPortfolio] = useState<PortfolioItem | null>(null);
  const [isAddingBlog, setIsAddingBlog] = useState(false);
  const [isAddingPortfolio, setIsAddingPortfolio] = useState(false);
  const [registrations, setRegistrations] = useState<CourseRegistration[]>([]);
  const [loadingRegistrations, setLoadingRegistrations] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchRegistrations = async () => {
    setLoadingRegistrations(true);
    try {
      const data = await getRegistrations();
      setRegistrations(data);
    } catch (err) {
      console.error("Error fetching registrations:", err);
    } finally {
      setLoadingRegistrations(false);
    }
  };

  React.useEffect(() => {
    fetchRegistrations();
  }, []);

  const handleDeleteReg = async (id: string) => {
    if (confirm('Are you sure you want to delete this course registration?')) {
      try {
        await deleteRegistration(id);
        toast.success('Registration deleted successfully');
        fetchRegistrations();
      } catch (err) {
        toast.error('Failed to delete registration');
      }
    }
  };

  const handleStatusChange = async (id: string, status: any) => {
    try {
      await updateRegistrationStatus(id, status);
      toast.success(`Applicant status updated to ${status}`);
      setRegistrations(prev => prev.map(r => r.id === id ? { ...r, status } : r));
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  const handleExportCSV = () => {
    if (registrations.length === 0) {
      toast.error('No registrations to export');
      return;
    }

    const headers = ['ID', 'Name', 'Email', 'Phone', 'Stream/Degree', 'Graduation Status/Year', 'Status', 'Motivation/Note', 'Date Submitted'];
    const rows = registrations.map(r => [
      `"${r.id}"`,
      `"${r.name?.replace(/"/g, '""') || ''}"`,
      `"${r.email?.replace(/"/g, '""') || ''}"`,
      `"${r.phone?.replace(/"/g, '""') || ''}"`,
      `"${r.stream?.replace(/"/g, '""') || ''}"`,
      `"${r.graduationStatus?.replace(/"/g, '""') || ''}"`,
      `"${r.status || 'Pending'}"`,
      `"${r.message?.replace(/"/g, '""') || ''}"`,
      `"${r.createdAt || ''}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `graycodder_ai_course_registrations_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Course registrations exported to CSV!');
  };

  const filteredRegistrations = registrations.filter(r => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      r.name?.toLowerCase().includes(q) ||
      r.email?.toLowerCase().includes(q) ||
      r.phone?.toLowerCase().includes(q) ||
      r.stream?.toLowerCase().includes(q) ||
      r.graduationStatus?.toLowerCase().includes(q)
    );
  });

  // Blog form state
  const [blogForm, setBlogForm] = useState<Partial<BlogPost>>({
    title: '',
    excerpt: '',
    content: '',
    author: '',
    category: '',
    imageUrl: '',
  });

  // Portfolio form state
  const [portfolioForm, setPortfolioForm] = useState<Partial<PortfolioItem>>({
    title: '',
    description: '',
    category: '',
    imageUrl: '',
    link: '',
  });

  const handleAddBlog = async () => {
    if (!blogForm.title || !blogForm.excerpt || !blogForm.content || !blogForm.author || !blogForm.category) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      const newPost: Omit<BlogPost, 'id'> = {
        title: blogForm.title!,
        excerpt: blogForm.excerpt!,
        content: blogForm.content!,
        author: blogForm.author!,
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
        imageUrl: blogForm.imageUrl || 'https://images.unsplash.com/photo-1730382624709-81e52dd294d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGdyb3d0aCUyMHN1Y2Nlc3N8ZW58MXx8fHwxNzcwNTAyNDA3fDA&ixlib=rb-4.1.0&q=80&w=1080',
        category: blogForm.category!,
        createdAt: new Date().toISOString(),
      };

      await addBlogPost(newPost);
      toast.success('Blog post added successfully!');
      onRefresh();
      setBlogForm({ title: '', excerpt: '', content: '', author: '', category: '', imageUrl: '' });
    } catch (error) {
      console.error('Error adding blog post:', error);
      toast.error(`Failed to add blog post: ${(error as Error).message}`);
    }
  };

  const handleUpdateBlog = async () => {
    if (!editingBlog) return;

    try {
      await updateBlogPost(editingBlog.id, blogForm);
      toast.success('Blog post updated successfully!');
      onRefresh();
      setEditingBlog(null);
    } catch (error) {
      console.error('Error updating blog post:', error);
      toast.error(`Failed to update blog post: ${(error as Error).message}`);
    }
  };

  const handleDeleteBlog = async (id: string) => {
    if (confirm('Are you sure you want to delete this blog post?')) {
      try {
        await deleteBlogPost(id);
        toast.success('Blog post deleted successfully!');
      } catch (error) {
        console.error('Error deleting blog post:', error);
        toast.error(`Failed to delete blog post: ${(error as Error).message}`);
      }
    }
  };

  const handleAddPortfolio = async () => {
    if (!portfolioForm.title || !portfolioForm.description || !portfolioForm.category) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      const newItem: Omit<PortfolioItem, 'id'> = {
        title: portfolioForm.title!,
        description: portfolioForm.description!,
        category: portfolioForm.category!,
        imageUrl: portfolioForm.imageUrl || 'https://images.unsplash.com/photo-1627599936744-51d288f89af4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMHRlYW0lMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzcwNDE5MzA5fDA&ixlib=rb-4.1.0&q=80&w=1080',
        link: portfolioForm.link,
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
        createdAt: new Date().toISOString(),
      };

      await addPortfolioItem(newItem);
      toast.success('Portfolio item added successfully!');
      onRefresh();
      setPortfolioForm({ title: '', description: '', category: '', imageUrl: '', link: '' });
    } catch (error) {
      console.error('Error adding portfolio item:', error);
      toast.error(`Failed to add portfolio item: ${(error as Error).message}`);
    }
  };

  const handleUpdatePortfolio = async () => {
    if (!editingPortfolio) return;

    try {
      await updatePortfolioItem(editingPortfolio.id, portfolioForm);
      toast.success('Portfolio item updated successfully!');
      onRefresh();
      setEditingPortfolio(null);
    } catch (error) {
      console.error('Error updating portfolio item:', error);
      toast.error(`Failed to update portfolio item: ${(error as Error).message}`);
    }
  };

  const handleDeletePortfolio = async (id: string) => {
    if (confirm('Are you sure you want to delete this portfolio item?')) {
      try {
        await deletePortfolioItem(id);
        toast.success('Portfolio item deleted successfully!');
      } catch (error) {
        console.error('Error deleting portfolio item:', error);
        toast.error(`Failed to delete portfolio item: ${(error as Error).message}`);
      }
    }
  };

  const startEditBlog = (post: BlogPost) => {
    setEditingBlog(post);
    setBlogForm(post);
    setIsAddingBlog(false);
  };

  const startEditPortfolio = (item: PortfolioItem) => {
    setEditingPortfolio(item);
    setPortfolioForm(item);
    setIsAddingPortfolio(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg w-full max-w-6xl my-8">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Admin Panel</h2>
            <p className="text-gray-600">Manage your blog posts and portfolio items</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={onLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
            <Button variant="ghost" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <Tabs defaultValue="registrations" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="registrations">
                AI Registrations ({(registrations || []).length})
              </TabsTrigger>
              <TabsTrigger value="blog">Blog Posts</TabsTrigger>
              <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            </TabsList>

            {/* Blog Tab */}
            <TabsContent value="blog" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Manage Blog Posts</h3>
                <Button
                  onClick={() => {
                    setIsAddingBlog(true);
                    setEditingBlog(null);
                    setBlogForm({ title: '', excerpt: '', content: '', author: '', category: '', imageUrl: '' });
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Post
                </Button>
              </div>

              {(isAddingBlog || editingBlog) && (
                <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                  <h4 className="font-semibold">
                    {editingBlog ? 'Edit Blog Post' : 'Add New Blog Post'}
                  </h4>

                  <Input
                    placeholder="Title *"
                    value={blogForm.title}
                    onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                  />

                  <Input
                    placeholder="Excerpt *"
                    value={blogForm.excerpt}
                    onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                  />

                  <Textarea
                    placeholder="Content *"
                    value={blogForm.content}
                    onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                    rows={6}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      placeholder="Author *"
                      value={blogForm.author}
                      onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })}
                    />

                    <Input
                      placeholder="Category *"
                      value={blogForm.category}
                      onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                    />
                  </div>

                  <Input
                    placeholder="Image URL (optional)"
                    value={blogForm.imageUrl}
                    onChange={(e) => setBlogForm({ ...blogForm, imageUrl: e.target.value })}
                  />

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsAddingBlog(false);
                        setEditingBlog(null);
                        setBlogForm({ title: '', excerpt: '', content: '', author: '', category: '', imageUrl: '' });
                      }}
                    >
                      Cancel
                    </Button>
                    <Button onClick={editingBlog ? handleUpdateBlog : handleAddBlog}>
                      {editingBlog ? 'Update' : 'Add'} Post
                    </Button>
                  </div>
                </div>
              )}

              <div className="space-y-3 max-h-96 overflow-y-auto">
                {(blogPosts || []).map((post) => (
                  <div key={post.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-semibold">{post.title}</h4>
                      <p className="text-sm text-gray-600">
                        {post.category} • {post.author} • {post.date}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => startEditBlog(post)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDeleteBlog(post.id)}>
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Portfolio Tab */}
            <TabsContent value="portfolio" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Manage Portfolio</h3>
                <Button
                  onClick={() => {
                    setIsAddingPortfolio(true);
                    setEditingPortfolio(null);
                    setPortfolioForm({ title: '', description: '', category: '', imageUrl: '', link: '' });
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Item
                </Button>
              </div>

              {(isAddingPortfolio || editingPortfolio) && (
                <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                  <h4 className="font-semibold">
                    {editingPortfolio ? 'Edit Portfolio Item' : 'Add New Portfolio Item'}
                  </h4>

                  <Input
                    placeholder="Title *"
                    value={portfolioForm.title}
                    onChange={(e) => setPortfolioForm({ ...portfolioForm, title: e.target.value })}
                  />

                  <Textarea
                    placeholder="Description *"
                    value={portfolioForm.description}
                    onChange={(e) => setPortfolioForm({ ...portfolioForm, description: e.target.value })}
                    rows={4}
                  />

                  <Input
                    placeholder="Category * (e.g., Web Development, Mobile App)"
                    value={portfolioForm.category}
                    onChange={(e) => setPortfolioForm({ ...portfolioForm, category: e.target.value })}
                  />

                  <Input
                    placeholder="Image URL (optional)"
                    value={portfolioForm.imageUrl}
                    onChange={(e) => setPortfolioForm({ ...portfolioForm, imageUrl: e.target.value })}
                  />

                  <Input
                    placeholder="Project Link (optional)"
                    value={portfolioForm.link}
                    onChange={(e) => setPortfolioForm({ ...portfolioForm, link: e.target.value })}
                  />

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsAddingPortfolio(false);
                        setEditingPortfolio(null);
                        setPortfolioForm({ title: '', description: '', category: '', imageUrl: '', link: '' });
                      }}
                    >
                      Cancel
                    </Button>
                    <Button onClick={editingPortfolio ? handleUpdatePortfolio : handleAddPortfolio}>
                      {editingPortfolio ? 'Update' : 'Add'} Item
                    </Button>
                  </div>
                </div>
              )}

              <div className="space-y-3 max-h-96 overflow-y-auto">
                {(portfolioItems || []).map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-semibold">{item.title}</h4>
                      <p className="text-sm text-gray-600">
                        {item.category} • {item.date}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => startEditPortfolio(item)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDeletePortfolio(item.id)}>
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* AI Course Registrations Tab */}
            <TabsContent value="registrations" className="space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gray-50 p-4 rounded-xl border border-gray-200">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Course Applicants</h3>
                  <p className="text-xs text-gray-500">Graycodder AI Consultants Certified "A Stack" Certificate Applications ({filteredRegistrations.length})</p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <div className="relative">
                    <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <Input
                      type="text"
                      placeholder="Search candidate..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 text-xs w-48 bg-white"
                    />
                  </div>

                  <Button variant="outline" size="sm" onClick={handleExportCSV} className="text-xs bg-white">
                    <Download className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                    Export CSV
                  </Button>

                  <Button variant="outline" size="sm" onClick={fetchRegistrations} disabled={loadingRegistrations} className="text-xs bg-white">
                    <RefreshCw className={`w-3.5 h-3.5 mr-1 ${loadingRegistrations ? 'animate-spin' : ''}`} />
                    Refresh
                  </Button>
                </div>
              </div>

              {filteredRegistrations.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                  <p className="text-gray-600 font-semibold">No candidate registrations found.</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {searchQuery ? 'Try clearing your search query.' : 'Share your social media registration link (https://aycodderweb.web.app/#register) to receive candidate applications!'}
                  </p>
                </div>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                  {filteredRegistrations.map((reg) => {
                    const cleanPhone = reg.phone ? reg.phone.replace(/[^0-9]/g, '') : '';
                    const whatsappLink = cleanPhone ? `https://wa.me/${cleanPhone}` : null;

                    return (
                      <div key={reg.id} className="p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-300 shadow-sm transition-all space-y-3">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <span className="font-bold text-gray-900 text-base">{reg.name}</span>
                              <span className="px-2.5 py-0.5 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                                {reg.stream || 'Graduate'}
                              </span>
                              <span className="px-2.5 py-0.5 bg-purple-100 text-purple-800 text-xs font-semibold rounded-full">
                                {reg.graduationStatus || 'Graduate'}
                              </span>
                            </div>
                            <div className="text-xs text-gray-500">
                              Applied: {reg.createdAt ? new Date(reg.createdAt).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' }) : 'Recently'}
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            {/* Candidate Status Selector */}
                            <select
                              value={reg.status || 'Pending'}
                              onChange={(e) => handleStatusChange(reg.id, e.target.value)}
                              className={`text-xs font-semibold px-2.5 py-1.5 rounded-lg border cursor-pointer ${
                                reg.status === 'Selected' ? 'bg-emerald-50 text-emerald-700 border-emerald-300' :
                                reg.status === 'Shortlisted' ? 'bg-blue-50 text-blue-700 border-blue-300' :
                                reg.status === 'Contacted' ? 'bg-amber-50 text-amber-700 border-amber-300' :
                                reg.status === 'Rejected' ? 'bg-red-50 text-red-700 border-red-300' :
                                'bg-gray-50 text-gray-700 border-gray-300'
                              }`}
                            >
                              <option value="Pending">🟡 Pending</option>
                              <option value="Shortlisted">🟦 Shortlisted</option>
                              <option value="Contacted">📙 Contacted</option>
                              <option value="Selected">🟢 Selected / Certified</option>
                              <option value="Rejected">🔴 Rejected</option>
                            </select>

                            <Button variant="outline" size="sm" onClick={() => handleDeleteReg(reg.id)} title="Delete Application">
                              <Trash2 className="w-4 h-4 text-red-600" />
                            </Button>
                          </div>
                        </div>

                        {/* Contact details & action links */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs bg-gray-50 p-3 rounded-lg border border-gray-100">
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold text-gray-700">Email:</span>
                            <a href={`mailto:${reg.email}`} className="text-blue-600 hover:underline font-medium flex items-center">
                              {reg.email}
                            </a>
                          </div>

                          <div className="flex items-center space-x-3">
                            <div className="flex items-center space-x-1">
                              <span className="font-semibold text-gray-700">Phone:</span>
                              <a href={`tel:${reg.phone}`} className="text-blue-600 hover:underline font-medium">
                                {reg.phone}
                              </a>
                            </div>

                            {whatsappLink && (
                              <a
                                href={whatsappLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-2 py-0.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-medium inline-flex items-center text-[10px]"
                              >
                                <MessageSquare className="w-3 h-3 mr-1" />
                                WhatsApp
                              </a>
                            )}
                          </div>
                        </div>

                        {/* Candidate motivation statement */}
                        {reg.message && (
                          <div className="text-xs text-gray-700 bg-blue-50/50 p-3 rounded-lg border border-blue-100">
                            <strong className="text-blue-900 block mb-1">Candidate Motivation & Background:</strong>
                            <p className="whitespace-pre-wrap text-gray-800 leading-relaxed">{reg.message}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Footer Note */}
        <div className="border-t p-4 bg-gray-50">
          <p className="text-sm text-gray-600 text-center">
            💡 In production, all data will be stored in Firebase Firestore and images in Firebase Storage
          </p>
        </div>
      </div>
    </div>
  );
}
