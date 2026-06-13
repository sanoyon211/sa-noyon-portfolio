"use client"

import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

type Project = {
  _id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  order?: number;
};

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  
  // Form State
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    technologies: '',
    liveUrl: '',
    githubUrl: '',
    order: 100
  })

  // Check auth on load
  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    if (token) {
      setPassword(token)
      setIsAuthenticated(true)
      fetchProjects(token)
    }
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      })
      
      if (res.ok) {
        localStorage.setItem('admin_token', password)
        setIsAuthenticated(true)
        toast.success("Logged in successfully")
        fetchProjects(password)
      } else {
        toast.error("Invalid password")
      }
    } catch (error) {
      toast.error("Login failed")
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    setIsAuthenticated(false)
    setPassword('')
  }

  const fetchProjects = async (token: string) => {
    setIsLoading(true)
    try {
      const res = await fetch('/api/projects')
      const json = await res.json()
      if (json.success) {
        setProjects(json.data)
      }
    } catch (error) {
      toast.error("Failed to fetch projects")
    } finally {
      setIsLoading(false)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    const formDataObj = new FormData()
    formDataObj.append('image', file)

    try {
      const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY
      if (!apiKey || apiKey === "your_imgbb_api_key_here") {
         toast.error("Please set NEXT_PUBLIC_IMGBB_API_KEY in .env.local")
         setIsUploading(false)
         return
      }

      const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: 'POST',
        body: formDataObj
      })
      const data = await res.json()
      
      if (data.success) {
        setFormData(prev => ({ ...prev, image: data.data.url }))
        toast.success("Image uploaded successfully!")
      } else {
        toast.error("Failed to upload image")
      }
    } catch (error) {
      toast.error("Error uploading image")
    } finally {
      setIsUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Convert comma separated technologies to array
    const techs = formData.technologies.split(',').map(t => t.trim()).filter(Boolean)
    
    const payload = {
      ...formData,
      technologies: techs,
      order: Number(formData.order) || 100
    }

    const url = editingId ? `/api/projects/${editingId}` : '/api/projects'
    const method = editingId ? 'PUT' : 'POST'

    try {
      const res = await fetch(url, {
        method,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${password}`
        },
        body: JSON.stringify(payload)
      })

      if (res.ok) {
        toast.success(editingId ? "Project updated!" : "Project added!")
        setFormData({ title: '', description: '', image: '', technologies: '', liveUrl: '', githubUrl: '', order: 100 })
        setEditingId(null)
        fetchProjects(password)
      } else {
        if (res.status === 401) handleLogout()
        toast.error("Failed to save project")
      }
    } catch (error) {
      toast.error("Error saving project")
    }
  }

  const handleEdit = (project: Project) => {
    setEditingId(project._id)
    setFormData({
      title: project.title,
      description: project.description,
      image: project.image,
      technologies: project.technologies.join(', '),
      liveUrl: project.liveUrl || '',
      githubUrl: project.githubUrl || '',
      order: project.order || 100
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return

    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${password}` }
      })
      
      if (res.ok) {
        toast.success("Project deleted")
        fetchProjects(password)
      } else {
        if (res.status === 401) handleLogout()
        toast.error("Failed to delete")
      }
    } catch (error) {
      toast.error("Error deleting")
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-950 p-4">
        <form onSubmit={handleLogin} className="bg-neutral-900 p-8 rounded-xl w-full max-w-md space-y-6">
          <h1 className="text-2xl font-bold text-white text-center">Admin Login</h1>
          <Input 
            type="password" 
            placeholder="Enter Admin Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-neutral-800 border-neutral-700 text-white"
            required
          />
          <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">Login</Button>
        </form>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Project Management</h1>
          <Button onClick={handleLogout} className="bg-red-500/10 text-red-500 hover:bg-red-500/20 hover:text-red-400 border border-red-500/20">Logout</Button>
        </div>

        {/* Add/Edit Form */}
        <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-800">
          <h2 className="text-xl font-semibold mb-4">{editingId ? 'Edit Project' : 'Add New Project'}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1 text-neutral-400">Title *</label>
                <Input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="bg-neutral-800 border-neutral-700" />
              </div>
              <div>
                <label className="block text-sm mb-1 text-neutral-400">Project Image *</label>
                <div className="flex gap-2 items-center">
                  <Input type="file" accept="image/*" onChange={handleImageUpload} disabled={isUploading} className="bg-neutral-800 border-neutral-700 cursor-pointer" />
                  {isUploading && <span className="text-sm text-purple-400 animate-pulse">Uploading...</span>}
                </div>
                {formData.image && !isUploading && (
                  <div className="mt-2 relative w-32 h-20 rounded overflow-hidden border border-neutral-700">
                    <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm mb-1 text-neutral-400">Live URL</label>
                <Input value={formData.liveUrl} onChange={e => setFormData({...formData, liveUrl: e.target.value})} className="bg-neutral-800 border-neutral-700" />
              </div>
              <div>
                <label className="block text-sm mb-1 text-neutral-400">GitHub URL</label>
                <Input value={formData.githubUrl} onChange={e => setFormData({...formData, githubUrl: e.target.value})} className="bg-neutral-800 border-neutral-700" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm mb-1 text-neutral-400">Technologies (Comma separated) *</label>
              <Input required value={formData.technologies} onChange={e => setFormData({...formData, technologies: e.target.value})} className="bg-neutral-800 border-neutral-700" placeholder="React, Next.js, MongoDB" />
            </div>

            <div>
              <label className="block text-sm mb-1 text-neutral-400">Description *</label>
              <Textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="bg-neutral-800 border-neutral-700" rows={4} />
            </div>

            <div>
              <label className="block text-sm mb-1 text-neutral-400">Priority / Order (e.g. 1 shows first)</label>
              <Input type="number" value={formData.order} onChange={e => setFormData({...formData, order: parseInt(e.target.value) || 100})} className="bg-neutral-800 border-neutral-700 max-w-[150px]" />
            </div>

            <div className="flex gap-4">
              <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                {editingId ? 'Update Project' : 'Save Project'}
              </Button>
              {editingId && (
                <Button type="button" variant="outline" onClick={() => { setEditingId(null); setFormData({title: '', description: '', image: '', technologies: '', liveUrl: '', githubUrl: '', order: 100})}}>
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </div>

        {/* Project List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Existing Projects</h2>
          {isLoading ? <p>Loading projects...</p> : (
            <div className="grid gap-4">
              {projects.map(project => (
                <div key={project._id} className="bg-neutral-900 p-4 rounded-xl border border-neutral-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <div className="flex items-center gap-3">
                       <h3 className="font-bold text-lg">{project.title}</h3>
                       <span className="bg-purple-600/20 text-purple-400 px-2 py-0.5 rounded text-xs">Order: {project.order || 100}</span>
                    </div>
                    <p className="text-sm text-neutral-400 truncate max-w-lg">{project.description}</p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Button onClick={() => handleEdit(project)} variant="secondary" size="sm">Edit</Button>
                    <Button onClick={() => handleDelete(project._id)} size="sm" className="bg-red-500/10 text-red-500 hover:bg-red-500/20 hover:text-red-400 border border-red-500/20">Delete</Button>
                  </div>
                </div>
              ))}
              {projects.length === 0 && <p className="text-neutral-500">No projects found.</p>}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
