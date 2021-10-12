import React from 'react'
import style from './../../styles/Profile.module.css'
import {ProfileInfo} from './ProfileInfo/ProfileInfo'
import MyPostsContainer from "../MyPostsContainer";
import {ProfileType} from "../../Types";

type PropsType = {
    profile: ProfileType | null
    updateStatus: (newStatusText: string) => void
    isOwner: boolean
    updateProfileImage: (image: File) => void
    saveProfile: (profile: ProfileType) => void
    editProfileSuccess: boolean
}

export const Profile: React.FC<PropsType> = ({profile, updateStatus, isOwner, updateProfileImage, saveProfile, editProfileSuccess}) => {
  return (
    <div className={style.content}>
      <ProfileInfo profile={profile} updateStatus={updateStatus} isOwner={isOwner} updateProfileImage={updateProfileImage} saveProfile={saveProfile} editProfileSuccess={editProfileSuccess}/>
      <MyPostsContainer />
    </div>
  );
}
