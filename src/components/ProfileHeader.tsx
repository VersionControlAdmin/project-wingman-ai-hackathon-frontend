import { MatchProfile } from "@/types/match";
import { cn } from "@/lib/utils";

interface ProfileHeaderProps {
  profile: MatchProfile;
  showProfilePicture: boolean;
  profilePictureBuzz: boolean;
  onImageClick: () => void;
}

export const ProfileHeader = ({
  profile,
  showProfilePicture,
  profilePictureBuzz,
  onImageClick,
}: ProfileHeaderProps) => {
  return (
    <div className="flex items-center space-x-4 mb-4">
      <div className="relative group">
        <div className="absolute inset-0 rounded-full bg-[#555555] opacity-0 group-hover:opacity-50 transition-opacity duration-300 blur-md" />
        <img
          src={profile.avatar}
          alt={profile.name}
          className={cn(
            "w-16 h-16 rounded-full object-cover cursor-pointer transition-all duration-300 relative z-10",
            !showProfilePicture && "blur-md",
            profilePictureBuzz && "animate-buzz"
          )}
          onClick={onImageClick}
        />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-primary">
          {profile.name}, {profile.age} • {profile.city}
        </h3>
        <p className="text-sm text-muted">{profile.bio}</p>
      </div>
    </div>
  );
};