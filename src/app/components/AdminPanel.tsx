import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { X, Plus, Edit, Trash2, LogOut } from 'lucide-react';
import { toast } from 'sonner';
import {
  BlogPost,
  PortfolioItem,
  addBlogPost,
  updateBlogPost,
  deleteBlogPost,
  addPortfolioItem,
  updatePortfolioItem,
  deletePortfolioItem
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
      setIsAddingBlog(false);
    } catch (error) {
      toast.error('Failed to add blog post');
    }
  };

  const handleUpdateBlog = async () => {
    if (!editingBlog) return;

    try {
      await updateBlogPost(editingBlog.id, blogForm);
      toast.success('Blog post updated successfully!');
      onRefresh();
      setEditingBlog(null);
      setBlogForm({ title: '', excerpt: '', content: '', author: '', category: '', imageUrl: '' });
    } catch (error) {
      toast.error('Failed to update blog post');
    }
  };

  const handleDeleteBlog = async (id: string) => {
    if (confirm('Are you sure you want to delete this blog post?')) {
      try {
        await deleteBlogPost(id);
        toast.success('Blog post deleted successfully!');
        onRefresh();
      } catch (error) {
        toast.error('Failed to delete blog post');
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
      setIsAddingPortfolio(false);
    } catch (error) {
      toast.error('Failed to add portfolio item');
    }
  };

  const handleUpdatePortfolio = async () => {
    if (!editingPortfolio) return;

    try {
      await updatePortfolioItem(editingPortfolio.id, portfolioForm);
      toast.success('Portfolio item updated successfully!');
      onRefresh();
      setEditingPortfolio(null);
      setPortfolioForm({ title: '', description: '', category: '', imageUrl: '', link: '' });
    } catch (error) {
      toast.error('Failed to update portfolio item');
    }
  };

  const handleDeletePortfolio = async (id: string) => {
    if (confirm('Are you sure you want to delete this portfolio item?')) {
      try {
        await deletePortfolioItem(id);
        toast.success('Portfolio item deleted successfully!');
        onRefresh();
      } catch (error) {
        toast.error('Failed to delete portfolio item');
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
          <Tabs defaultValue="blog" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
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
                {blogPosts.map((post) => (
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
                {portfolioItems.map((item) => (
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
