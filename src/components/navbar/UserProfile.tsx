import { getCurrentUser } from "@/actions/user"
import { Button } from "../ui/button"

export default async function UserProfile(){
    const user = await getCurrentUser()
    if(!user){
        return(
            // <div className="h-full items-center">
                <Button size="lg">Signin</Button>
            // </div>
        )
    }
}