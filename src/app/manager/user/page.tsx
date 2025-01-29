import { IUser } from "@/app/types";
import AlertInfo from "@/components/Alert";
import { BASE_API_URL, BASE_IMAGE_PROFILE } from "@/global";
import { get } from "@/lib/api-bridge";
import { getCookies } from "@/lib/server-cookies";
import Image from 'next/image';
import AddUser from "./addUser";
import DeleteUser from "./deleteUser";
import EditUser from "./editUser";
import Search from "./search";

const getUser = async (search: string): Promise<IUser[]> => {
    try {
        const TOKEN = await getCookies("token");
        const url = `${BASE_API_URL}/user?search=${search}`;
        const { data } = await get(url, TOKEN);
        let result: IUser[] = [];
        if (data?.status) result = [...data.data];
        return result;
    } catch (error) {
        console.log(error);
        return [];
    }
};

const UserPage = async ({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined }}) => {
    const search = searchParams.search ? searchParams.search.toString() : ``;
    const users: IUser[] = await getUser(search);
    
    return (
        <div className="m-2 bg-white text-black rounded-lg p-3 border-t-4 border-t-primary shadow-md">
            <h4 className="text-xl font-bold mb-2">User Data</h4>
            <p className="text-sm text-secondary mb-4">
                This page displays user data, allowing users to view details, 
                search, and manage user accounts by adding, editing, or deleting them.
            </p>
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center w-full max-w-md flex-grow">
                    <Search url={`/manager/user`} search={search} />
                </div>

                <div>
                    <AddUser></AddUser>
                </div>
            </div>
            {
                users.length === 0 ?
                    <AlertInfo title="Informasi">
                        <p>No data available</p>
                    </AlertInfo>
                :
                <>
                    <div className="m-2">
                        {users.map((user, index) => (
                            <div key={`userKey${index}`} className={`flex flex-wrap shadow m-2`}>
                                <div className="w-full md:w-1/12 p-2">
                                    <small className="text-sm font-bold text-primary">Profile Picture</small><br />
                                    <Image width={40} height={40} src={`${BASE_IMAGE_PROFILE}/${user.profile_picture}`} className="rounded-sm overflow-hidden" alt="profile" unoptimized />
                                </div>
                                <div className="w-full md:w-2/12 p-2">
                                    <small className="text-sm font-bold text-primary">Name</small> <br />
                                    {user.name}
                                </div>
                                <div className="w-full md:w-2/12 p-2">
                                    <small className="text-sm font-bold text-primary">Email</small> <br />
                                    {user.email}
                                </div>
                                <div className="w-full md:w-2/12 p-2">
                                    <small className="text-sm font-bold text-primary">Role</small> <br />
                                    {user.role}
                                </div>
                                <div className="w-full md:w-3/12 p-2">
                                    <small className="text-sm font-bold text-primary">Created At</small> <br />
                                    {new Date(user.createdAt).toLocaleDateString()}
                                </div>
                                <div className="w-full md:w-2/12 p-2">
                                    <small className="text-sm font-bold text-primary">Action</small><br />
                                    {/* Tambahkan button edit/hapus jika diperlukan */}
                                    <EditUser selectedUser={user}></EditUser>
                                    <DeleteUser selectedUser={user}></DeleteUser>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            }
        </div>
    );
};

export default UserPage;
