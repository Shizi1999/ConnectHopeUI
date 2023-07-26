import UserUpdateInfomationForm from '~/components/UserUpdateInfomationForm';
import useAppContext from '~/hooks/useAppContext';
import { User } from '~/types/user.type';
import { setProfileToLS } from '~/utils/auth';

function Me() {
  const { profile, setProfile } = useAppContext();
  const handleUpdateUser = (user: User) => {
    setProfile({ ...profile, ...user });
    setProfileToLS({ ...profile, ...user });
  };
  return (
    <div className='bg-white p-4 rounded-md shadow-sm'>
      <UserUpdateInfomationForm onSuccess={handleUpdateUser} user={profile} />
    </div>
  );
}

export default Me;
