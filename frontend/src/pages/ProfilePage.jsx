import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";

const ProfilePage = () => {
	// Get user data and functions from your global store
	const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
	
	// State to hold the temporary URL for the image preview
	const [previewImg, setPreviewImg] = useState(null);

	const handleImageUpload = async (e) => {
		const file = e.target.files[0];
		if (!file) return;

		// Create a temporary local URL to preview the image instantly
		setPreviewImg(URL.createObjectURL(file));

		// Create a FormData object to send the actual file to the backend
		const formData = new FormData();
		formData.append("profilePic", file);

		// Call the updateProfile function from the store to handle the API call
		await updateProfile(formData);
	};

	return (
		<div className='h-screen pt-20'>
			<div className='max-w-2xl mx-auto p-4 py-8'>
				<div className='bg-base-300 rounded-xl p-6 space-y-8'>
					<div className='text-center'>
						<h1 className='text-2xl font-ninja font-semibold '>Profile</h1>
						<p className='mt-2 text-base-content/70'>Your shinobi registration card</p>
					</div>

					{/* Avatar upload section */}
					<div className='flex flex-col items-center gap-4'>
						<div className='relative'>
							<div className='avatar'>
								<div className='w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2'>
									<img src={previewImg || authUser.profilePic || "/avatar.png"} alt='Profile' />
								</div>
							</div>
							<label
								htmlFor='avatar-upload'
								className={`
									absolute bottom-1 right-1 
									bg-base-content hover:scale-105
									p-2 rounded-full cursor-pointer 
									transition-all duration-200
									${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
								`}
							>
								<Camera className='w-5 h-5 text-base-200' />
								<input
									type='file'
									id='avatar-upload'
									className='hidden'
									accept='image/*'
									onChange={handleImageUpload}
									disabled={isUpdatingProfile}
								/>
							</label>
						</div>
						<p className='text-sm text-base-content/60'>
							{isUpdatingProfile ? "Executing jutsu..." : "Click the camera to update your photo"}
						</p>
					</div>

					{/* User Information Section */}
					<div className='space-y-6'>
						<div className='space-y-1.5'>
							<div className='text-sm text-base-content/60 flex items-center gap-2'>
								<User className='w-4 h-4' />
								Full Name
							</div>
							<p className='px-4 py-2.5 bg-base-200 rounded-lg border border-neutral'>{authUser?.fullName}</p>
						</div>
						<div className='space-y-1.5'>
							<div className='text-sm text-base-content/60 flex items-center gap-2'>
								<Mail className='w-4 h-4' />
								Email Address
							</div>
							<p className='px-4 py-2.5 bg-base-200 rounded-lg border border-neutral'>{authUser?.email}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfilePage;