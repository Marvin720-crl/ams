
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
import { UserPlus, Loader2, AlertCircle } from 'lucide-react'

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
        toast.success('Registration successful! Please wait for admin approval before logging in.');
      } else {
        toast.success('Registration successful! Please login.');
      }

      router.push('/')
    } catch (error: any) {
      console.error(error)
      toast.error(error.message || 'Registration failed.')
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col">

      {/* HEADER */}

      <header className="bg-primary shadow-md">
        <div className="container mx-auto px-6 py-4 flex items-center">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="AMA Portal"
              width={150}
              height={40}
              style={{ height: 'auto' }}
            />
          </Link>
        </div>
      </header>

      {/* MAIN */}

      <main className="flex-grow flex items-center justify-center p-4">

        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">

          {/* LEFT PANEL */}

          <div className="w-full md:w-2/5 bg-primary text-white p-10 md:p-12 flex flex-col justify-center">

            <h1 className="text-3xl md:text-4xl font-bold mb-4 uppercase">
              Join Academic Hub
            </h1>

            <p className="text-white/80 text-sm leading-relaxed">
              Create your account to access the AMA Student Portal. Student accounts require manual verification by the registrar.
            </p>

          </div>

          {/* RIGHT PANEL */}

          <div className="w-full md:w-3/5 p-8 md:p-12 overflow-y-auto max-h-[85vh] no-scrollbar">

            <h2 className="text-2xl font-bold mb-2">
              Registration
            </h2>

            <p className="text-muted-foreground mb-8">
              Fill in your details to create an account.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* ROLE */}

              <div className="space-y-2">
                <Label>I am a</Label>

                <Select
                  value={formData.role}
                  onValueChange={(v: Role) => {
                    updateField('role', v);
                    updateField('id', ''); // Reset ID when role changes
                  }}
                >
                  <SelectTrigger className="h-12 rounded-xl">
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent className="rounded-xl">
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="teacher">Teacher</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* ID */}

              <div className="space-y-2">
                <div className="flex justify-between items-end">
                  <Label>
                    {formData.role === 'student' ? 'Student ID / USN (11 digits)' : 'Employee ID (8 digits)'}
                  </Label>
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${
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
                  className="h-12 rounded-xl font-bold text-lg"
                  placeholder={formData.role === 'student' ? "e.g. 25001198310" : "e.g. 12345678"}
                />
              </div>

              {/* NAME */}

              <div className="space-y-2">
                <Label>Full Name</Label>

                <Input
                  value={formData.name}
                  onChange={e => updateField('name', e.target.value)}
                  required
                  disabled={loading}
                  className="h-12 rounded-xl"
                />
              </div>

              {/* EMAIL */}

              <div className="space-y-2">
                <Label>Email</Label>

                <Input
                  type="email"
                  value={formData.email}
                  onChange={e => updateField('email', e.target.value)}
                  required
                  disabled={loading}
                  className="h-12 rounded-xl"
                />
              </div>

              {/* PASSWORD */}

              <div className="space-y-2">
                <Label>Password</Label>

                <Input
                  type="password"
                  value={formData.password}
                  onChange={e => updateField('password', e.target.value)}
                  required
                  disabled={loading}
                  className="h-12 rounded-xl"
                />
              </div>

              {/* STUDENT FIELDS */}

              {formData.role === 'student' && (
                <>
                  <div className="grid grid-cols-2 gap-4">

                    <div className="space-y-2">
                      <Label>Program</Label>

                      <Input
                        placeholder={formData.department === 'shs' ? "STEM / ABM" : "BSCS"}
                        value={formData.program}
                        onChange={e => updateField('program', e.target.value)}
                        required
                        disabled={loading}
                        className="h-12 rounded-xl"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Year / Grade Level</Label>

                      <Select
                        value={String(formData.year)}
                        onValueChange={v => updateField('year', Number(v))}
                      >
                        <SelectTrigger className="h-12 rounded-xl">
                          <SelectValue />
                        </SelectTrigger>

                        <SelectContent className="rounded-xl">
                          {formData.department === 'shs' ? (
                            <>
                              <SelectItem value="11">Grade 11</SelectItem>
                              <SelectItem value="12">Grade 12</SelectItem>
                            </>
                          ) : (
                            <>
                              <SelectItem value="1">1st Year</SelectItem>
                              <SelectItem value="2">2nd Year</SelectItem>
                              <SelectItem value="3">3rd Year</SelectItem>
                              <SelectItem value="4">4th Year</SelectItem>
                            </>
                          )}
                        </SelectContent>
                      </Select>
                    </div>

                  </div>

                  <div className="border-t pt-5 mt-5 space-y-4">
                    <h3 className="text-sm font-black uppercase tracking-widest text-primary">Emergency Contact</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-[10px] font-bold uppercase">Name</Label>
                        <Input value={formData.emergencyContactName} onChange={e => updateField('emergencyContactName', e.target.value)} disabled={loading} className="h-12 rounded-xl" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] font-bold uppercase">Address</Label>
                        <Input value={formData.emergencyContactAddress} onChange={e => updateField('emergencyContactAddress', e.target.value)} disabled={loading} className="h-12 rounded-xl" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] font-bold uppercase">Phone Number</Label>
                        <Input value={formData.emergencyContactPhone} onChange={e => updateField('emergencyContactPhone', e.target.value)} disabled={loading} className="h-12 rounded-xl" />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* TEACHER SECRET */}

              {formData.role === 'teacher' && (
                <div className="space-y-2">
                  <Label>Teacher Secret Code</Label>

                  <Input
                    type="password"
                    value={formData.teacherSecret}
                    onChange={e => updateField('teacherSecret', e.target.value)}
                    required
                    disabled={loading}
                    className="h-12 rounded-xl"
                  />
                </div>
              )}

              {/* SUBMIT */}

              <Button
                type="submit"
                className="w-full h-14 text-sm font-black uppercase tracking-widest gap-2 rounded-2xl shadow-xl shadow-primary/20"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" />
                    REGISTERING...
                  </>
                ) : (
                  <>
                    Sign Up
                    <UserPlus size={18} />
                  </>
                )}
              </Button>

            </form>

            <div className="text-center mt-6 text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/" className="font-semibold text-primary hover:underline">
                Sign In
              </Link>
            </div>

          </div>

        </div>

      </main>
    </div>
  )
}
