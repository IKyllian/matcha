import { User } from "front/typing/user";

export const isUserProfileComplete = (user: User): boolean => {
    return !!(
        user &&
        user.gender &&
        user.sexual_preference &&
        user.images?.find(img => img.is_profile_picture) &&
        user.age && user.age >= 18
    )
}