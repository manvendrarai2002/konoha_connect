import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
	const { selectedUser, setSelectedUser } = useChatStore();
	const { onlineUsers, authUser } = useAuthStore(); // 1. Get the up-to-date authUser

	if (!selectedUser) return null; // Prevent crashes if no user is selected

	// 2. Check if the selected user is the currently logged-in user
	const isCurrentUser = selectedUser._id === authUser._id;

	// 3. Use the fresh authUser data if it's the current user, otherwise use selectedUser
	const userToShow = isCurrentUser ? authUser : selectedUser;

	return (
		<div className='p-2.5 border-b border-base-300'>
			<div className='flex items-center justify-between'>
				<div className='flex items-center gap-3'>
					{/* Avatar */}
					<div className='avatar'>
						<div className='size-10 rounded-full relative'>
							<img src={userToShow.profilePic || "/avatar.png"} alt={userToShow.fullName} />
						</div>
					</div>

					{/* User info */}
					<div>
						<h3 className='font-medium'>{userToShow.fullName}</h3>
						<p className='text-sm text-base-content/70'>
							{onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
						</p>
					</div>
				</div>

				{/* Close button */}
				<button onClick={() => setSelectedUser(null)}>
					<X />
				</button>
			</div>
		</div>
	);
};
export default ChatHeader;