import React, { Suspense } from 'react'
import NewNavbar from '../../../components/NewNavbar'
import { Outlet, useLoaderData, defer, Await } from 'react-router-dom'
import { getProfileData } from '../../../../api'
import LoadingScreen from "../../../components/LoadingScreen"

export async function loader({ params }) {
    const username = params.username;
    try {
        const profileDataPromise = getProfileData(username);

        return defer({ profileData: profileDataPromise })
    } catch (err) {
        console.log(err);
        return null
    }
}

function ProfileLayout() {
    const loaderData = useLoaderData();
    return (
        <>
            <NewNavbar position='static' />
            <Suspense fallback={<LoadingScreen logout={false} />}>
                <Await resolve={loaderData.profileData}>
                    {(loadedProfileData) => {
                        console.log(loadedProfileData)
                        return (
                            <Outlet context={loadedProfileData} />
                        )
                    }}
                </Await>
            </Suspense>
        </>
    )
}

export default ProfileLayout