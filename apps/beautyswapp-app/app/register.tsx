import { SplitBackgroundLayout } from '@/components/login/split-background-layout';
import { RegisterForm } from '@/components/login/register-form';

export default function RegisterScreen() {
  return (
    <SplitBackgroundLayout
      topImage={require('@/assets/images/login/purple-login.jpg')}
      overlayHeight="90%"
    >
      <RegisterForm />
    </SplitBackgroundLayout>
  );
}
