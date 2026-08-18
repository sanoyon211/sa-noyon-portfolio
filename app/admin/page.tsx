"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { toast } from 'sonner'
import { 
  User, 
  FileText, 
  FolderKanban, 
  ExternalLink, 
  Upload, 
  Save, 
  Trash2, 
  Edit3, 
  Plus, 
  LogOut, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  Eye, 
  Globe, 
  Github, 
  FileCheck,
  RefreshCw,
  Search,
  ArrowUpRight,
  Layers,
  FileCode,
  Laptop
} from 'lucide-react'
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
  githubClientUrl?: string;
  githubServerUrl?: string;
  order?: number;
};

type ProfileData = {
  nameText: string;
  headingText: string;
  subheadingText: string;
  descriptionText: string;
  aboutTitle: string;
  greeting: string;
  descriptionParagraphs: string[];
  infoCards: { label: string; value: string }[];
  resumeUrl: string;
  resumeFilename: string;
  imageSrc: string;
};

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)
  const [activeTab, setActiveTab] = useState<'profile' | 'projects'>('profile')

  // Projects State
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoadingProjects, setIsLoadingProjects] = useState(false)
  const [projectSearch, setProjectSearch] = useState('')
  const [isEditingProject, setIsEditingProject] = useState(false)
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null)
  const [isUploadingProjectImage, setIsUploadingProjectImage] = useState(false)
  const [projectFormData, setProjectFormData] = useState({
    title: '',
    description: '',
    image: '',
    technologies: '',
    liveUrl: '',
    githubUrl: '',
    githubClientUrl: '',
    githubServerUrl: '',
    order: 100
  })

  // Profile State
  const [profileData, setProfileData] = useState<ProfileData>({
    nameText: '',
    headingText: '',
    subheadingText: '',
    descriptionText: '',
    aboutTitle: '',
    greeting: '',
    descriptionParagraphs: [],
    infoCards: [],
    resumeUrl: '',
    resumeFilename: '',
    imageSrc: ''
  })
  const [isSavingProfile, setIsSavingProfile] = useState(false)
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false)
  const [isUploadingResume, setIsUploadingResume] = useState(false)

  // Check auth and load data on load
  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    
    fetch('/api/auth')
      .then(res => res.json())
      .then(data => {
        if (data.authenticated || token) {
          setIsAuthenticated(true)
          if (token) setPassword(token)
          loadInitialData(token || '')
        }
      })
      .catch(() => {
        if (token) {
          setIsAuthenticated(true)
          setPassword(token)
          loadInitialData(token)
        }
      })
      .finally(() => setIsCheckingAuth(false))
  }, [])

  const loadInitialData = (token: string) => {
    fetchProjects(token)
    fetchProfile()
  }

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
        toast.success("Welcome back, SA Noyon!")
        loadInitialData(password)
      } else {
        toast.error("Invalid admin credentials")
      }
    } catch (error) {
      toast.error("Login request failed")
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/auth', { method: 'DELETE' })
    } catch {}
    localStorage.removeItem('admin_token')
    setIsAuthenticated(false)
    setPassword('')
    toast.success("Logged out successfully")
  }

  // Profile Fetch & Save
  const fetchProfile = async () => {
    try {
      const res = await fetch('/api/profile')
      const json = await res.json()
      if (json.success && json.data) {
        setProfileData(json.data)
      }
    } catch (error) {
      toast.error("Failed to load profile data")
    }
  }

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSavingProfile(true)
    try {
      const headers: Record<string, string> = { 'Content-Type': 'application/json' }
      if (password) headers['Authorization'] = `Bearer ${password}`

      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers,
        body: JSON.stringify(profileData)
      })

      const json = await res.json()
      if (res.ok && json.success) {
        setProfileData(json.data)
        toast.success("Profile & Resume settings saved successfully!")
      } else {
        toast.error(json.error || "Failed to update profile")
      }
    } catch (error) {
      toast.error("Error saving profile")
    } finally {
      setIsSavingProfile(false)
    }
  }

  // Upload Handlers
  const handleUploadFile = async (
    file: File, 
    type: 'avatar' | 'resume' | 'project'
  ) => {
    const formDataObj = new FormData()
    formDataObj.append('file', file)

    const headers: Record<string, string> = {}
    if (password) headers['Authorization'] = `Bearer ${password}`

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers,
        body: formDataObj
      })
      const json = await res.json()

      if (res.ok && json.success) {
        if (type === 'avatar') {
          setProfileData(prev => ({ ...prev, imageSrc: json.url }))
          toast.success("Profile picture uploaded successfully!")
        } else if (type === 'resume') {
          setProfileData(prev => ({ 
            ...prev, 
            resumeUrl: json.url, 
            resumeFilename: json.filename || 'SA_Noyon_Resume.pdf' 
          }))
          toast.success("Resume PDF uploaded successfully!")
        } else if (type === 'project') {
          setProjectFormData(prev => ({ ...prev, image: json.url }))
          toast.success("Project image uploaded successfully!")
        }
      } else {
        toast.error(json.error || "Upload failed")
      }
    } catch (error) {
      toast.error("File upload failed")
    }
  }

  // Projects Fetch & CRUD
  const fetchProjects = async (token?: string) => {
    setIsLoadingProjects(true)
    try {
      const headers: Record<string, string> = {}
      const auth = token || password
      if (auth) headers['Authorization'] = `Bearer ${auth}`

      const res = await fetch('/api/projects', { headers })
      const json = await res.json()
      if (json.success) {
        setProjects(json.data)
      }
    } catch (error) {
      toast.error("Failed to load projects")
    } finally {
      setIsLoadingProjects(false)
    }
  }

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault()
    const techs = projectFormData.technologies
      .split(',')
      .map(t => t.trim())
      .filter(Boolean)

    const payload = {
      ...projectFormData,
      technologies: techs,
      order: Number(projectFormData.order) || 100
    }

    const url = editingProjectId ? `/api/projects/${editingProjectId}` : '/api/projects'
    const method = editingProjectId ? 'PUT' : 'POST'

    const headers: Record<string, string> = { 'Content-Type': 'application/json' }
    if (password) headers['Authorization'] = `Bearer ${password}`

    try {
      const res = await fetch(url, {
        method,
        headers,
        body: JSON.stringify(payload)
      })

      if (res.ok) {
        toast.success(editingProjectId ? "Project updated successfully!" : "New project added!")
        resetProjectForm()
        fetchProjects()
      } else {
        toast.error("Failed to save project")
      }
    } catch (error) {
      toast.error("Error saving project")
    }
  }

  const handleEditProject = (project: Project) => {
    setEditingProjectId(project._id)
    setIsEditingProject(true)
    setProjectFormData({
      title: project.title,
      description: project.description,
      image: project.image,
      technologies: project.technologies.join(', '),
      liveUrl: project.liveUrl || '',
      githubUrl: project.githubUrl || '',
      githubClientUrl: project.githubClientUrl || '',
      githubServerUrl: project.githubServerUrl || '',
      order: project.order || 100
    })
    window.scrollTo({ top: 300, behavior: 'smooth' })
  }

  const handleDeleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this project?')) return

    const headers: Record<string, string> = {}
    if (password) headers['Authorization'] = `Bearer ${password}`

    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
        headers
      })

      if (res.ok) {
        toast.success("Project deleted")
        fetchProjects()
      } else {
        toast.error("Failed to delete project")
      }
    } catch (error) {
      toast.error("Error deleting project")
    }
  }

  const resetProjectForm = () => {
    setEditingProjectId(null)
    setIsEditingProject(false)
    setProjectFormData({
      title: '',
      description: '',
      image: '',
      technologies: '',
      liveUrl: '',
      githubUrl: '',
      githubClientUrl: '',
      githubServerUrl: '',
      order: 100
    })
  }

  // Filter projects by search
  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(projectSearch.toLowerCase()) ||
    p.technologies.some(t => t.toLowerCase().includes(projectSearch.toLowerCase()))
  )

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-[#09090b] flex flex-col items-center justify-center text-white">
        <RefreshCw className="w-8 h-8 text-purple-500 animate-spin mb-4" />
        <p className="text-neutral-400 font-medium">Verifying admin session...</p>
      </div>
    )
  }

  // ===================== LOGIN SCREEN =====================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#09090b] text-white p-4 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-md bg-neutral-900/80 backdrop-blur-xl border border-neutral-800 rounded-2xl p-8 shadow-2xl relative z-10 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 bg-gradient-to-tr from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-purple-500/20">
              <ShieldCheck className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Admin Command Center</h1>
            <p className="text-sm text-neutral-400">Enter your password to manage your portfolio</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-neutral-400 mb-1.5">Master Password</label>
              <Input
                type="password"
                placeholder="Enter password..."
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="bg-neutral-800/80 border-neutral-700 h-11 text-white placeholder:text-neutral-500 focus:border-purple-500"
                required
              />
            </div>

            <Button type="submit" className="w-full h-11 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 font-semibold shadow-lg shadow-purple-600/25">
              Access Dashboard
            </Button>
          </form>

          <div className="pt-4 border-t border-neutral-800/80 text-center">
            <Link href="/" className="inline-flex items-center gap-1 text-xs text-neutral-400 hover:text-purple-400 transition-colors">
              <ArrowUpRight className="w-3.5 h-3.5" /> Return to live website
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // ===================== DASHBOARD =====================
  return (
    <div className="min-h-screen bg-[#09090b] text-neutral-100 selection:bg-purple-500/30">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-neutral-900/80 backdrop-blur-md border-b border-neutral-800 px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center font-bold text-white shadow-md shadow-purple-500/20">
              SA
            </div>
            <div>
              <h1 className="text-base font-bold leading-tight">SA Noyon Admin</h1>
              <p className="text-xs text-neutral-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Live Hub
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-lg border border-neutral-700 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              View Site
            </Link>

            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="h-8 border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-300 text-xs"
            >
              <LogOut className="w-3.5 h-3.5 mr-1" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-neutral-800 pb-4">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
              activeTab === 'profile'
                ? 'bg-purple-600/15 text-purple-400 border border-purple-500/30 shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
            }`}
          >
            <User className="w-4 h-4" />
            Profile & Resume Studio
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
              activeTab === 'projects'
                ? 'bg-purple-600/15 text-purple-400 border border-purple-500/30 shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
            }`}
          >
            <FolderKanban className="w-4 h-4" />
            Projects Management ({projects.length})
          </button>
        </div>

        {/* ===================== TAB 1: PROFILE & RESUME ===================== */}
        {activeTab === 'profile' && (
          <form onSubmit={handleSaveProfile} className="space-y-8">
            
            {/* Top Row: Visual Media Cards (Avatar & Resume) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Profile Picture Card */}
              <div className="bg-neutral-900/60 backdrop-blur-sm border border-neutral-800 rounded-2xl p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Profile Picture</h3>
                      <p className="text-xs text-neutral-400">Updates avatar across the About section</p>
                    </div>
                  </div>
                  <span className="text-xs bg-purple-500/20 text-purple-300 px-2.5 py-1 rounded-full font-medium">
                    Live
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-6 pt-2">
                  <div className="relative w-32 h-32 rounded-2xl overflow-hidden border-2 border-purple-500/40 bg-neutral-800 shrink-0 shadow-lg group">
                    {profileData.imageSrc ? (
                      <Image
                        src={profileData.imageSrc}
                        alt="Profile Avatar"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-neutral-600">
                        <User className="w-12 h-12" />
                      </div>
                    )}
                  </div>

                  <div className="space-y-3 flex-1 w-full">
                    <div>
                      <label className="block text-xs font-medium text-neutral-400 mb-1.5">
                        Upload New Picture (PNG, JPG, WEBP)
                      </label>
                      <div className="flex gap-2 items-center">
                        <Input
                          type="file"
                          accept="image/*"
                          disabled={isUploadingAvatar}
                          onChange={async (e) => {
                            const file = e.target.files?.[0]
                            if (file) {
                              setIsUploadingAvatar(true)
                              await handleUploadFile(file, 'avatar')
                              setIsUploadingAvatar(false)
                            }
                          }}
                          className="bg-neutral-800/80 border-neutral-700 file:bg-purple-600 file:text-white file:border-0 file:rounded-md file:px-3 file:py-1 file:text-xs file:mr-3 cursor-pointer text-xs"
                        />
                      </div>
                      {isUploadingAvatar && <p className="text-xs text-purple-400 mt-1 animate-pulse">Uploading photo...</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-neutral-400 mb-1">
                        Or Enter Direct Image URL
                      </label>
                      <Input
                        value={profileData.imageSrc}
                        onChange={e => setProfileData(prev => ({ ...prev, imageSrc: e.target.value }))}
                        placeholder="/images/sa-noyon.jpg or https://..."
                        className="bg-neutral-800/80 border-neutral-700 text-xs h-9"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Resume / CV Card */}
              <div className="bg-neutral-900/60 backdrop-blur-sm border border-neutral-800 rounded-2xl p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Resume & CV Document</h3>
                      <p className="text-xs text-neutral-400">Controls the Download Resume button</p>
                    </div>
                  </div>
                  {profileData.resumeUrl && (
                    <a
                      href={profileData.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 px-3 py-1 rounded-full font-medium transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" /> Test View
                    </a>
                  )}
                </div>

                <div className="space-y-4 pt-2">
                  <div>
                    <label className="block text-xs font-medium text-neutral-400 mb-1.5">
                      Upload New Resume (PDF)
                    </label>
                    <Input
                      type="file"
                      accept="application/pdf"
                      disabled={isUploadingResume}
                      onChange={async (e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          setIsUploadingResume(true)
                          await handleUploadFile(file, 'resume')
                          setIsUploadingResume(false)
                        }
                      }}
                      className="bg-neutral-800/80 border-neutral-700 file:bg-blue-600 file:text-white file:border-0 file:rounded-md file:px-3 file:py-1 file:text-xs file:mr-3 cursor-pointer text-xs"
                    />
                    {isUploadingResume && <p className="text-xs text-blue-400 mt-1 animate-pulse">Uploading PDF document...</p>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-neutral-400 mb-1">
                        Resume File URL / Path
                      </label>
                      <Input
                        value={profileData.resumeUrl}
                        onChange={e => setProfileData(prev => ({ ...prev, resumeUrl: e.target.value }))}
                        placeholder="/SA_Noyon_Resume.pdf or https://..."
                        className="bg-neutral-800/80 border-neutral-700 text-xs h-9"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-neutral-400 mb-1">
                        Download Filename
                      </label>
                      <Input
                        value={profileData.resumeFilename}
                        onChange={e => setProfileData(prev => ({ ...prev, resumeFilename: e.target.value }))}
                        placeholder="SA_Noyon_Resume_Full_Stack.pdf"
                        className="bg-neutral-800/80 border-neutral-700 text-xs h-9"
                      />
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Hero & About Text Section */}
            <div className="bg-neutral-900/60 backdrop-blur-sm border border-neutral-800 rounded-2xl p-6 space-y-6">
              <div className="flex items-center gap-2.5 border-b border-neutral-800 pb-4">
                <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
                  <Edit3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Personal Information & Bios</h3>
                  <p className="text-xs text-neutral-400">Customize titles, subheadings, and about paragraphs</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-400 mb-1">Display Name</label>
                  <Input
                    value={profileData.nameText}
                    onChange={e => setProfileData(prev => ({ ...prev, nameText: e.target.value }))}
                    placeholder="Md Sohab Akter Noyon"
                    className="bg-neutral-800/80 border-neutral-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-400 mb-1">Hero Subheading</label>
                  <Input
                    value={profileData.subheadingText}
                    onChange={e => setProfileData(prev => ({ ...prev, subheadingText: e.target.value }))}
                    placeholder="Full-Stack Web Developer | Specializing in MERN Stack"
                    className="bg-neutral-800/80 border-neutral-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1">About Section Greeting</label>
                <Input
                  value={profileData.greeting}
                  onChange={e => setProfileData(prev => ({ ...prev, greeting: e.target.value }))}
                  placeholder="Hello! I'm Md Sohab Akter Noyon"
                  className="bg-neutral-800/80 border-neutral-700"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1">
                  About Paragraphs (One paragraph per block)
                </label>
                <div className="space-y-3">
                  {profileData.descriptionParagraphs.map((para, idx) => (
                    <div key={idx} className="flex gap-2 items-start">
                      <span className="text-xs text-neutral-500 font-mono mt-2">#{idx + 1}</span>
                      <Textarea
                        value={para}
                        rows={3}
                        onChange={e => {
                          const updated = [...profileData.descriptionParagraphs]
                          updated[idx] = e.target.value
                          setProfileData(prev => ({ ...prev, descriptionParagraphs: updated }))
                        }}
                        className="bg-neutral-800/80 border-neutral-700 text-sm flex-1"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          const updated = profileData.descriptionParagraphs.filter((_, i) => i !== idx)
                          setProfileData(prev => ({ ...prev, descriptionParagraphs: updated }))
                        }}
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/10 mt-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setProfileData(prev => ({
                        ...prev,
                        descriptionParagraphs: [...prev.descriptionParagraphs, ""]
                      }))
                    }}
                    className="border-neutral-700 text-xs"
                  >
                    <Plus className="w-3.5 h-3.5 mr-1.5" /> Add Paragraph
                  </Button>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-800 flex justify-end">
                <Button
                  type="submit"
                  disabled={isSavingProfile}
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold px-8 h-11 shadow-lg shadow-purple-600/20"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {isSavingProfile ? "Saving Changes..." : "Save All Profile & Resume Settings"}
                </Button>
              </div>
            </div>

          </form>
        )}

        {/* ===================== TAB 2: PROJECTS MANAGEMENT ===================== */}
        {activeTab === 'projects' && (
          <div className="space-y-8">
            
            {/* Header & Add Project Button */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-neutral-900/60 backdrop-blur-sm border border-neutral-800 p-6 rounded-2xl">
              <div>
                <h2 className="text-xl font-bold">Projects Directory</h2>
                <p className="text-xs text-neutral-400">Manage, sort, and publish your portfolio showcase projects</p>
              </div>
              <Button
                onClick={() => {
                  if (isEditingProject) {
                    resetProjectForm()
                  } else {
                    setIsEditingProject(true)
                  }
                }}
                className="bg-purple-600 hover:bg-purple-700 text-white shadow-md shadow-purple-600/20"
              >
                {isEditingProject ? "Cancel Form" : <><Plus className="w-4 h-4 mr-1.5" /> Add New Project</>}
              </Button>
            </div>

            {/* Add / Edit Project Form */}
            {isEditingProject && (
              <div className="bg-neutral-900/90 border border-purple-500/30 rounded-2xl p-6 space-y-6 shadow-xl relative animate-in fade-in slide-in-from-top-4 duration-300">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                  <h3 className="font-semibold text-lg text-purple-400">
                    {editingProjectId ? '✏️ Edit Project' : '✨ Add New Project'}
                  </h3>
                  <Button type="button" variant="ghost" size="sm" onClick={resetProjectForm} className="text-xs text-neutral-400">
                    Close
                  </Button>
                </div>

                <form onSubmit={handleSaveProject} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-neutral-400 mb-1">Project Title *</label>
                      <Input
                        required
                        value={projectFormData.title}
                        onChange={e => setProjectFormData({ ...projectFormData, title: e.target.value })}
                        placeholder="e.g. MediQueue Healthcare"
                        className="bg-neutral-800 border-neutral-700"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-neutral-400 mb-1">Priority Order (1 = Top)</label>
                      <Input
                        type="number"
                        value={projectFormData.order}
                        onChange={e => setProjectFormData({ ...projectFormData, order: parseInt(e.target.value) || 100 })}
                        className="bg-neutral-800 border-neutral-700"
                      />
                    </div>

                    {/* Image Upload & URL */}
                    <div className="md:col-span-2 space-y-2">
                      <label className="block text-xs font-medium text-neutral-400">Project Thumbnail Image *</label>
                      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                        <Input
                          type="file"
                          accept="image/*"
                          disabled={isUploadingProjectImage}
                          onChange={async (e) => {
                            const file = e.target.files?.[0]
                            if (file) {
                              setIsUploadingProjectImage(true)
                              await handleUploadFile(file, 'project')
                              setIsUploadingProjectImage(false)
                            }
                          }}
                          className="bg-neutral-800 border-neutral-700 file:bg-purple-600 file:text-white file:border-0 file:rounded-md file:px-3 file:py-1 file:text-xs cursor-pointer text-xs"
                        />
                        <Input
                          required
                          value={projectFormData.image}
                          onChange={e => setProjectFormData({ ...projectFormData, image: e.target.value })}
                          placeholder="or paste image URL /path..."
                          className="bg-neutral-800 border-neutral-700 text-xs"
                        />
                      </div>
                      {projectFormData.image && (
                        <div className="relative w-36 h-20 rounded-lg overflow-hidden border border-neutral-700 mt-2">
                          <Image src={projectFormData.image} alt="Preview" fill className="object-cover" unoptimized />
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-neutral-400 mb-1">Live Demo URL</label>
                      <Input
                        value={projectFormData.liveUrl}
                        onChange={e => setProjectFormData({ ...projectFormData, liveUrl: e.target.value })}
                        placeholder="https://my-app.vercel.app"
                        className="bg-neutral-800 border-neutral-700"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-neutral-400 mb-1">GitHub Repo (Main)</label>
                      <Input
                        value={projectFormData.githubUrl}
                        onChange={e => setProjectFormData({ ...projectFormData, githubUrl: e.target.value })}
                        placeholder="https://github.com/sanoyon211/repo"
                        className="bg-neutral-800 border-neutral-700"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-neutral-400 mb-1">GitHub Client Repo (Optional)</label>
                      <Input
                        value={projectFormData.githubClientUrl}
                        onChange={e => setProjectFormData({ ...projectFormData, githubClientUrl: e.target.value })}
                        placeholder="https://github.com/sanoyon211/client"
                        className="bg-neutral-800 border-neutral-700"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-neutral-400 mb-1">GitHub Server Repo (Optional)</label>
                      <Input
                        value={projectFormData.githubServerUrl}
                        onChange={e => setProjectFormData({ ...projectFormData, githubServerUrl: e.target.value })}
                        placeholder="https://github.com/sanoyon211/server"
                        className="bg-neutral-800 border-neutral-700"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-400 mb-1">
                      Technologies (Comma separated) *
                    </label>
                    <Input
                      required
                      value={projectFormData.technologies}
                      onChange={e => setProjectFormData({ ...projectFormData, technologies: e.target.value })}
                      placeholder="React, Next.js, Node.js, Express, MongoDB, Tailwind CSS"
                      className="bg-neutral-800 border-neutral-700"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-400 mb-1">Description *</label>
                    <Textarea
                      required
                      rows={3}
                      value={projectFormData.description}
                      onChange={e => setProjectFormData({ ...projectFormData, description: e.target.value })}
                      placeholder="Describe what the project does, its standout features and technical stack..."
                      className="bg-neutral-800 border-neutral-700"
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white font-semibold">
                      {editingProjectId ? "Update Project" : "Save Project"}
                    </Button>
                    <Button type="button" variant="outline" onClick={resetProjectForm} className="border-neutral-700">
                      Cancel
                    </Button>
                  </div>
                </form>
              </div>
            )}

            {/* Projects List & Search */}
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3.5 top-3 w-4 h-4 text-neutral-500" />
                <Input
                  value={projectSearch}
                  onChange={e => setProjectSearch(e.target.value)}
                  placeholder="Search projects by title or technology..."
                  className="pl-10 bg-neutral-900 border-neutral-800 h-10 text-sm"
                />
              </div>

              {isLoadingProjects ? (
                <div className="p-12 text-center text-neutral-500 flex items-center justify-center gap-2">
                  <RefreshCw className="w-5 h-5 animate-spin" /> Loading projects...
                </div>
              ) : filteredProjects.length === 0 ? (
                <div className="bg-neutral-900/40 border border-neutral-800 rounded-2xl p-12 text-center text-neutral-500">
                  <FolderKanban className="w-12 h-12 mx-auto mb-3 opacity-40" />
                  <p className="text-base font-medium">No projects found</p>
                  <p className="text-xs text-neutral-600 mt-1">Try a different search query or add a new project above.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredProjects.map((project) => (
                    <div
                      key={project._id}
                      className="bg-neutral-900/60 backdrop-blur-sm border border-neutral-800 hover:border-neutral-700 rounded-2xl p-5 flex flex-col justify-between space-y-4 transition-all duration-200 group"
                    >
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-neutral-800 border border-neutral-700 shrink-0">
                              <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                className="object-cover"
                                unoptimized
                              />
                            </div>
                            <div>
                              <h4 className="font-bold text-base group-hover:text-purple-400 transition-colors">
                                {project.title}
                              </h4>
                              <span className="text-[11px] bg-purple-500/15 text-purple-400 px-2 py-0.5 rounded-md font-mono">
                                Order: {project.order ?? 100}
                              </span>
                            </div>
                          </div>

                          <div className="flex gap-1.5 shrink-0">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleEditProject(project)}
                              className="h-8 w-8 p-0 text-neutral-400 hover:text-white hover:bg-neutral-800"
                            >
                              <Edit3 className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDeleteProject(project._id)}
                              className="h-8 w-8 p-0 text-red-400 hover:text-red-300 hover:bg-red-500/10"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap gap-1 pt-1">
                          {project.technologies.map(t => (
                            <span key={t} className="text-[11px] bg-neutral-800 text-neutral-300 px-2 py-0.5 rounded-md border border-neutral-700/50">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-3 pt-3 border-t border-neutral-800 text-xs text-neutral-400">
                        {project.liveUrl && (
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 flex items-center gap-1">
                            <Globe className="w-3.5 h-3.5" /> Live
                          </a>
                        )}
                        {project.githubUrl && (
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 flex items-center gap-1">
                            <Github className="w-3.5 h-3.5" /> Repo
                          </a>
                        )}
                        {project.githubClientUrl && (
                          <a href={project.githubClientUrl} target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 flex items-center gap-1">
                            <Laptop className="w-3.5 h-3.5" /> Client
                          </a>
                        )}
                        {project.githubServerUrl && (
                          <a href={project.githubServerUrl} target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 flex items-center gap-1">
                            <FileCode className="w-3.5 h-3.5" /> Server
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        )}

      </main>
    </div>
  )
}
