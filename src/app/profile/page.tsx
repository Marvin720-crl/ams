'use client';

import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import {
Select,
SelectContent,
SelectItem,
SelectTrigger,
SelectValue
} from '@/components/ui/select';

import {
ArrowLeft,
Camera,
Save,
User as UserIcon,
Loader2,
QrCode
} from 'lucide-react';

import { toast } from 'sonner';

import { updateUserAction } from '@/app/actions/dbActions';

import Link from 'next/link';

import {
Dialog,
DialogContent,
DialogDescription,
DialogHeader,
DialogTitle,
DialogTrigger
} from '@/components/ui/dialog';

import { QRCodeSVG as QRCode } from 'qrcode.react';

export default function ProfilePage() {

const { user, updateCurrentUser } = useAuth();

const fileInputRef = useRef<HTMLInputElement>(null);

const [loading,setLoading] = useState(false);

const [formData,setFormData] = useState({
name:'',
email:'',
program:'',
year:1,
profilePic:'',
emergencyContactName:'',
emergencyContactAddress:'',
emergencyContactPhone:''
});

/* ------------------------------
   LOAD USER DATA
------------------------------ */

useEffect(()=>{

if(user){

setFormData({
name:user.name || '',
email:user.email || '',
program:user.program || '',
year:user.year || 1,
profilePic:user.profilePic || '',
emergencyContactName:user.emergencyContactName || '',
emergencyContactAddress:user.emergencyContactAddress || '',
emergencyContactPhone:user.emergencyContactPhone || ''
});

}

},[user]);

/* ------------------------------
   IMAGE UPLOAD
------------------------------ */

const handleImageUpload = (
e:React.ChangeEvent<HTMLInputElement>
)=>{

const file = e.target.files?.[0];

if(!file) return;

const reader = new FileReader();

reader.onloadend = ()=>{

setFormData({
...formData,
profilePic:reader.result as string
});

};

reader.readAsDataURL(file);

};

/* ------------------------------
   SAVE PROFILE
------------------------------ */

const handleSave = async ()=>{

if(!user) return;

setLoading(true);

try{

const updates:any = {
name:formData.name,
email:formData.email,
profilePic:formData.profilePic
};

if(user.role==='student'){

updates.program=formData.program;
updates.year=formData.year;
updates.emergencyContactName=formData.emergencyContactName;
updates.emergencyContactAddress=formData.emergencyContactAddress;
updates.emergencyContactPhone=formData.emergencyContactPhone;

}

const updatedUser =
await updateUserAction(user.id,updates);

if(updatedUser){

updateCurrentUser(updatedUser);

toast.success('Profile updated successfully');

}else{

toast.error('User not found');

}

}catch{

toast.error('Failed to update profile');

}finally{

setLoading(false);

}

};

if(!user) return null;

/* ------------------------------
   UI
------------------------------ */

return(

<div className="min-h-screen bg-muted/20 py-10 px-4">

<div className="max-w-5xl mx-auto space-y-6">

{/* Back Button */}

<Button variant="ghost" asChild>

<Link href="/dashboard">

<ArrowLeft className="w-4 h-4 mr-2"/>

Back to Dashboard

</Link>

</Button>

{/* Profile Card */}

<Card className="rounded-3xl overflow-hidden shadow-xl border">

{/* Header */}

<div className="bg-primary h-32 relative"/>

{/* Avatar */}

<div className="flex justify-center -mt-16">

<div className="relative">

<div className="w-32 h-32 rounded-full border-4 border-white bg-white overflow-hidden shadow-md flex items-center justify-center">

{formData.profilePic ? (

<img
src={formData.profilePic}
alt="profile"
className="w-full h-full object-cover"
/>

):(

<UserIcon className="w-16 h-16 text-gray-400"/>

)}

</div>

<button
onClick={()=>fileInputRef.current?.click()}
className="absolute bottom-1 right-1 w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center shadow"
>

<Camera size={16}/>

</button>

<input
ref={fileInputRef}
type="file"
accept="image/*"
onChange={handleImageUpload}
className="hidden"
/>

</div>

</div>

{/* Name + QR */}

<div className="text-center mt-4 space-y-2">

<h2 className="text-2xl font-bold">
{formData.name}
</h2>

<div className="flex justify-center">

<Dialog>

<DialogTrigger asChild>

<Button variant="outline" size="sm">

<QrCode className="mr-2 h-4 w-4"/>

View Digital ID

</Button>

</DialogTrigger>

<DialogContent className="sm:max-w-sm">

<DialogHeader>

<DialogTitle>My Digital ID</DialogTitle>

<DialogDescription>

Present this QR code for scanning.

</DialogDescription>

</DialogHeader>

<div className="flex justify-center p-4 bg-white rounded">

<QRCode
value={user.id}
size={220}
includeMargin
/>

</div>

</DialogContent>

</Dialog>

</div>

</div>

{/* Form */}

<CardContent className="p-8 space-y-8">

<div className="grid md:grid-cols-2 gap-6">

{/* Name */}

<div>

<Label>Full Name</Label>

<Input
value={formData.name}
onChange={(e)=>
setFormData({
...formData,
name:e.target.value
})
}
/>

</div>

{/* Email */}

<div>

<Label>Email</Label>

<Input
type="email"
value={formData.email}
onChange={(e)=>
setFormData({
...formData,
email:e.target.value
})
}
/>

</div>

{/* Program */}

<div>

<Label>Program</Label>

<Input
value={formData.program}
disabled={user.role!=='student'}
onChange={(e)=>
setFormData({
...formData,
program:e.target.value
})
}
/>

</div>

{/* Year */}

<div>

<Label>Year Level</Label>

<Select
value={String(formData.year)}
disabled={user.role!=='student'}
onValueChange={(v)=>
setFormData({
...formData,
year:parseInt(v)
})
}
>

<SelectTrigger>

<SelectValue/>

</SelectTrigger>

<SelectContent>

<SelectItem value="1">
1st Year
</SelectItem>

<SelectItem value="2">
2nd Year
</SelectItem>

<SelectItem value="3">
3rd Year
</SelectItem>

<SelectItem value="4">
4th Year
</SelectItem>

</SelectContent>

</Select>

</div>

{/* Student ID */}

<div>

<Label>ID Number</Label>

<Input value={user.id} disabled/>

</div>

</div>

{/* Emergency Contact */}

{user.role==='student' && (

<div className="border-t pt-6 space-y-4">

<h3 className="font-semibold">
Emergency Contact
</h3>

<div className="grid md:grid-cols-2 gap-6">

<div>

<Label>Contact Name</Label>

<Input
value={formData.emergencyContactName}
onChange={(e)=>
setFormData({
...formData,
emergencyContactName:e.target.value
})
}
/>

</div>

<div>

<Label>Phone</Label>

<Input
value={formData.emergencyContactPhone}
onChange={(e)=>
setFormData({
...formData,
emergencyContactPhone:e.target.value
})
}
/>

</div>

<div className="md:col-span-2">

<Label>Address</Label>

<Input
value={formData.emergencyContactAddress}
onChange={(e)=>
setFormData({
...formData,
emergencyContactAddress:e.target.value
})
}
/>

</div>

</div>

</div>

)}

{/* Buttons */}

<div className="flex justify-end gap-3 pt-6">

<Button variant="outline" asChild>

<Link href="/dashboard">
Cancel
</Link>

</Button>

<Button
onClick={handleSave}
disabled={loading}
>

{loading
? <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
: <Save className="mr-2 h-4 w-4"/>
}

Save Changes

</Button>

</div>

</CardContent>

</Card>

</div>

</div>

);

}