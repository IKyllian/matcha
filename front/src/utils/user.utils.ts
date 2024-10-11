import { User } from "front/typing/user";

export const isUserProfileComplete = (user: User): boolean => {
    return !!(
        user.gender &&
        user.sexual_preference &&
        (
            user.profile_picture ||
            (
                !user.profile_picture && user.images?.find(img => img.is_profile_picture)
            )
        ) &&
        user.age
    )
}