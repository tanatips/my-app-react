import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'

export default function ResetPassword() {
  const [formData, setFormData] = useState({
    username: '',
    newPassword: '',
    confirmPassword: ''
  })
  
  const [showPassword, setShowPassword] = useState({
    new: false,
    confirm: false
  })
  
  const [errors, setErrors] = useState({
    password: '',
    general: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate passwords match
    if (formData.newPassword !== formData.confirmPassword) {
      setErrors(prev => ({
        ...prev,
        password: 'รหัสผ่านไม่ตรงกัน'
      }))
      return
    }

    // Validate password requirements
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
    if (!passwordRegex.test(formData.newPassword)) {
      setErrors(prev => ({
        ...prev,
        password: 'รหัสผ่านไม่ตรงตามข้อกำหนด'
      }))
      return
    }

    try {
      // API call to reset password
      // await resetPassword(formData)
      alert('รีเซ็ตรหัสผ่านสำเร็จ')
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        general: 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง'
      }))
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">รีเซ็ตรหัสผ่าน</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* <div className="space-y-2">
            <Label htmlFor="username">ชื่อผู้ใช้/อีเมล</Label>
            <Input
              id="username"
              value={formData.username}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                username: e.target.value
              }))}
              required
            />
          </div> */}

          <div className="space-y-2">
            <Label htmlFor="newPassword">รหัสผ่านใหม่</Label>
            <div className="relative">
              <Input
                id="newPassword"
                type={showPassword.new ? "text" : "password"}
                value={formData.newPassword}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  newPassword: e.target.value
                }))}
                className="pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(prev => ({
                  ...prev,
                  new: !prev.new
                }))}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {showPassword.new ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">ยืนยันรหัสผ่านใหม่</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showPassword.confirm ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  confirmPassword: e.target.value
                }))}
                className="pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(prev => ({
                  ...prev,
                  confirm: !prev.confirm
                }))}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {showPassword.confirm ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
          </div>

          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}

          <div className="text-sm text-gray-600">
            <p>รหัสผ่านต้องประกอบด้วย:</p>
            <ul className="list-disc list-inside">
              <li>ความยาวอย่างน้อย 8 ตัวอักษร</li>
              <li>ตัวพิมพ์ใหญ่อย่างน้อย 1 ตัว</li>
              <li>ตัวพิมพ์เล็กอย่างน้อย 1 ตัว</li>
              <li>ตัวเลขอย่างน้อย 1 ตัว</li>
            </ul>
          </div>

          {errors.general && (
            <p className="text-red-500 text-sm text-center">{errors.general}</p>
          )}

          <Button type="submit" className="w-full">
            รีเซ็ตรหัสผ่าน
          </Button>
        </form>
      </div>
    </div>
  )
}