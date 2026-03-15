
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

import { toast } from 'sonner'
import { UserPlus, Loader2, AlertCircle, ArrowLeft } from 'lucide-react'

import {
  addUserAction,
  getUsersAction,
  getSettingsAction
} from '@/app/actions/dbActions'

import { Department } from '@/utils/storage'

type Role = 'student' | 'teacher'

interface RegisterForm {
  id: string
  name: string
  email: string
  password: string
  role: Role
  department: Department
  program: string
  year: number
  teacherSecret: string
  emergencyContactName: string;
  emergencyContactAddress: string;
  emergencyContactPhone: string;
}

export default function RegisterPage() {
  const router = useRouter()

  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState<RegisterForm>({
    id: '',
    name: '',
    email: '',
    password: '',
    role: 'student',
    department: 'college',
    program: '',
    year: 1,
    teacherSecret: '',
    emergencyContactName: '',
    emergencyContactAddress: '',
    emergencyContactPhone: ''
  })

  const updateField = (field: keyof RegisterForm, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const validateID = () => {
    if (formData.role === 'student' && formData.id.length !== 11) {
      return "Student USN must be exactly 11 digits.";
    }
    if (formData.role === 'teacher' && formData.id.length !== 8) {
      return "Employee ID must be exactly 8 digits.";
    }
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const idError = validateID();
    if (idError) {
      toast.error(idError);
      return;
    }

    if (loading) return
    setLoading(true)

    try {
      const users = await getUsersAction()

      if (users.some(u => u.id === formData.id)) {
        toast.error('User with this ID already exists.')
        setLoading(false)
        return
      }

      if (formData.role === 'teacher') {
        const settings = await getSettingsAction()

        if (formData.teacherSecret !== settings.teacherSecret) {
          toast.error('Invalid teacher secret code.')
          setLoading(false)
          return
        }
      }

      const newUser = {
        id: formData.id,
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        department: formData.department,
        program: formData.role === 'student' ? formData.program : undefined,
        year: formData.role === 'student' ? formData.year : undefined,
        emergencyContactName: formData.role === 'student' ? formData.emergencyContactName : undefined,
        emergencyContactAddress: formData.role === 'student' ? formData.emergencyContactAddress : undefined,
        emergencyContactPhone: formData.role === 'student' ? formData.emergencyContactPhone : undefined,
        profilePic: '',
        isApproved: formData.role !== 'student' // Admin approval required for students
      }

      await addUserAction(newUser as any)

      if (formData.role === 'student') {
        toast.success('Registration successful!', {
          description: 'Please wait for admin approval before logging in.'
        });
      } else {
        toast.success('Registration successful!', {
          description: 'You can now sign in to your dashboard.'
        });
      }

      router.push('/')
    } catch (error: any) {
      console.error(error)
      toast.error(error.message || 'Registration failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col">

      {/* HEADER */}

      <header className="bg-primary shadow-md">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="AMA Portal"
              width={150}
              height={40}
              style={{ height: 'auto' }}
            />
          </Link>
          <Button variant="ghost" asChild className="text-white hover:bg-white/10 rounded-full">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Login
            </Link>
          </Button>
        </div>
      </header>

      {/* MAIN */}

      <main className="flex-grow flex items-center justify-center p-4">

        <div className="w-full max-w-4xl bg-white rounded-theme-xl shadow-2xl overflow-hidden flex flex-col md:flex-row">

          {/* LEFT PANEL */}

          <div className="w-full md:w-2/5 bg-primary text-white p-10 md:p-12 flex flex-col justify-center items-start">

            <h1 className="text-3xl md:text-4xl font-black mb-6 uppercase tracking-tighter leading-tight">
              JOIN ACADEMIC HUB
            </h1>

            <p className="text-white/80 text-sm leading-relaxed font-bold">
              Create your account to access the AMA Student Portal. Student accounts require manual verification by the registrar.
            </p>

          </div>

          {/* RIGHT PANEL */}

          <div className="w-full md:w-3/5 p-8 md:p-12 overflow-y-auto max-h-[85vh] no-scrollbar">

            <h2 className="text-2xl font-black uppercase tracking-tighter mb-2">
              Registration
            </h2>

            <p className="text-muted-foreground font-bold text-xs uppercase tracking-widest mb-10">
              Fill in your details to create an account.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* ROLE */}

              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest ml-1">I am a</Label>

                <Select
                  value={formData.role}
                  onValueChange={(v: Role) => {
                    updateField('role', v);
                    updateField('id', ''); // Reset ID when role changes
                  }}
                >
                  <SelectTrigger className="h-12 rounded-xl font-bold">
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent className="rounded-xl">
                    <SelectItem value="student" className="font-bold">Student</SelectItem>
                    <SelectItem value="teacher" className="font-bold">Teacher</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* ID */}

              <div className="space-y-2">
                <div className="flex justify-between items-end">
                  <Label className="text-[10px] font-black uppercase tracking-widest ml-1">
                    {formData.role === 'student' ? 'Student ID / USN (11 digits)' : 'Employee ID (8 digits)'}
                  </Label>
                  <span className={`text-[10px] font-black uppercase tracking-widest ${
                    formData.role === 'student' 
                      ? (formData.id.length === 11 ? 'text-green-500' : 'text-primary')
                      : (formData.id.length === 8 ? 'text-green-500' : 'text-primary')
                  }`}>
                    {formData.id.length} / {formData.role === 'student' ? '11' : '8'}
                  </span>
                </div>

                <Input
                  value={formData.id}
                  onChange={e => updateField('id', e.target.value)}
                  required
                  maxLength={formData.role === 'student' ? 11 : 8}
                  disabled={loading}
                  className="h-14 rounded-xl font-black text-xl tracking-widest px-6"
                  placeholder={formData.role === 'student' ? "e.g. 25001198310" : "e.g. 12345678"}
                />
              </div>

              {/* NAME */}

              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest ml-1">Full Name</Label>

                <Input
                  value={formData.name}
                  onChange={e => updateField('name', e.target.value)}
                  required
                  disabled={loading}
                  className="h-12 rounded-xl font-bold px-6"
                  placeholder="Juan Dela Cruz"
                />
              </div>

              {/* EMAIL */}

              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest ml-1">Email</Label>

                <Input
                  type="email"
                  value={formData.email}
                  onChange={e => updateField('email', e.target.value)}
                  required
                  disabled={loading}
                  className="h-12 rounded-xl font-bold px-6"
                  placeholder="juan@school.edu"
                />
              </div>

              {/* PASSWORD */}

              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest ml-1">Password</Label>

                <Input
                  type="password"
                  value={formData.password}
                  onChange={e => updateField('password', e.target.value)}
                  required
                  disabled={loading}
                  className="h-12 rounded-xl font-bold px-6"
                  placeholder="••••••••"
                />
              </div>

              {/* STUDENT FIELDS */}

              {formData.role === 'student' && (
                <>
                  <div className="grid grid-cols-2 gap-4">

                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest ml-1">Program</Label>

                      <Input
                        placeholder={formData.department === 'shs' ? "STEM" : "BSCS"}
                        value={formData.program}
                        onChange={e => updateField('program', e.target.value)}
                        required
                        disabled={loading}
                        className="h-12 rounded-xl font-bold"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest ml-1">Year / Grade</Label>

                      <Select
                        value={String(formData.year)}
                        onValueChange={v => updateField('year', Number(v))}
                      >
                        <SelectTrigger className="h-12 rounded-xl font-bold">
                          <SelectValue />
                        </SelectTrigger>

                        <SelectContent className="rounded-xl">
                          {formData.department === 'shs' ? (
                            <>
                              <SelectItem value="11" className="font-bold">Grade 11</SelectItem>
                              <SelectItem value="12" className="font-bold">Grade 12</SelectItem>
                            </>
                          ) : (
                            <>
                              <SelectItem value="1" className="font-bold">1st Year</SelectItem>
                              <SelectItem value="2" className="font-bold">2nd Year</SelectItem>
                              <SelectItem value="3" className="font-bold">3rd Year</SelectItem>
                              <SelectItem value="4" className="font-bold">4th Year</SelectItem>
                            </>
                          )}
                        </SelectContent>
                      </Select>
                    </div>

                  </div>

                  <div className="border-t border-primary/5 pt-8 mt-8 space-y-6">
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary">Emergency Protocol Contact</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest ml-1">Contact Name</Label>
                        <Input value={formData.emergencyContactName} onChange={e => updateField('emergencyContactName', e.target.value)} disabled={loading} className="h-12 rounded-xl font-bold" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest ml-1">Address</Label>
                        <Input value={formData.emergencyContactAddress} onChange={e => updateField('emergencyContactAddress', e.target.value)} disabled={loading} className="h-12 rounded-xl font-bold" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest ml-1">Phone Number</Label>
                        <Input value={formData.emergencyContactPhone} onChange={e => updateField('emergencyContactPhone', e.target.value)} disabled={loading} className="h-12 rounded-xl font-bold" />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* TEACHER SECRET */}

              {formData.role === 'teacher' && (
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest ml-1">Instructor Authentication Code</Label>

                  <Input
                    type="password"
                    value={formData.teacherSecret}
                    onChange={e => updateField('teacherSecret', e.target.value)}
                    required
                    disabled={loading}
                    className="h-12 rounded-xl font-bold px-6"
                    placeholder="Enter Secret Code"
                  />
                </div>
              )}

              {/* SUBMIT */}

              <Button
                type="submit"
                className="w-full h-16 text-sm font-black uppercase tracking-[0.2em] gap-3 rounded-2xl shadow-xl shadow-primary/20 transition-all active:scale-95"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" />
                    AUTHENTICATING...
                  </>
                ) : (
                  <>
                    Commit Registration
                    <UserPlus size={20} />
                  </>
                )}
              </Button>

            </form>

            <div className="text-center mt-8 text-sm font-bold text-muted-foreground uppercase tracking-tight">
              Already have an account?{" "}
              <Link href="/" className="font-black text-primary hover:underline ml-1">
                Sign In
              </Link>
            </div>

          </div>

        </div>

      </main>
    </div>
  )
}
