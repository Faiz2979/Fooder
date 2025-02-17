
import Image from 'next/image';


interface UserSectionProps {
    user: string;
    role: string;
}

export default async function userSection({ user, role }: UserSectionProps) {

    return (
        <div className=" mt-10 ml-10 mb-6 bg-primary text-white p-3">
            <div className='w-auto outline outline-4 p-2 outline-white flex gap-2 items-center rounded-md'>
                <Image src="/ewing.jpg" alt="Profile" width={60} height={60} className="rounded-full" />
                <div className="text-2xl font-semibold">
                    {user}
                </div>
            </div>
        </div>
    )
}