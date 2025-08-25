import { createSafeAction } from "@/lib/actionState"
import { cookies } from "next/headers"

export const getCurrentUser = async () => {
    const cookie = await cookies()
    const token = cookie.get("brickly")
    if(!token) return null
}

// export const getUser = createSafeAction(null,getUserHandler)
