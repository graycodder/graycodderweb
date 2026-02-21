import React from 'react';
import { Target, Eye, Award } from 'lucide-react';

export function About() {
  return (
    <section id="about" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            About Graycodder
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Empowering businesses with cutting-edge technology solutions from the heart of Kerala
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <img
              src="https://images.unsplash.com/photo-1741388505655-3322689ffad6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrZXJhbGElMjBpbmRpYSUyMGNvYXN0YWwlMjB2aWxsYWdlfGVufDF8fHx8MTc3MDUyMTMyMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Chellanam Kerala"
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
          </div>

          <div className="space-y-6">
            <p className="text-gray-700 leading-relaxed">
              Established with a vision to transform businesses through technology, Graycodder has been 
              serving clients for over 14 years from our base in Chellanam, Kochi, Kerala. We specialize 
              in providing comprehensive technical solutions that drive business growth and innovation.
            </p>

            <p className="text-gray-700 leading-relaxed">
              Our team of experienced professionals is dedicated to delivering end-to-end website development 
              and mobile application development services. We don't just build applications; we create 
              solutions that help businesses flourish in the digital age.
            </p>

            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-bold text-gray-900 mb-2">Our Location</h3>
              <p className="text-gray-700">
                Graycodder<br />
                Reg No: KL-02-0105921<br />
                Building Number: 16/149<br />
                S. Chellanam, Kochi - 682008<br />
                Kerala, India
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full mb-4">
              <Eye className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Our Vision</h3>
            <p className="text-gray-700">
              Flourish with Us - Empowering businesses to thrive through innovative technology solutions
            </p>
          </div>

          <div className="text-center p-6 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 text-white rounded-full mb-4">
              <Target className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Our Mission</h3>
            <p className="text-gray-700">
              Deliver excellence in technical solutions and ideas to improve businesses across industries
            </p>
          </div>

          <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600 text-white rounded-full mb-4">
              <Award className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Our Commitment</h3>
            <p className="text-gray-700">
              End-to-end solutions with 14+ years of expertise ensuring quality and client satisfaction
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
