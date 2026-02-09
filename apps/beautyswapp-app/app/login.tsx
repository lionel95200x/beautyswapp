import { SplitBackgroundLayout } from '@/components/login/split-background-layout';
import { LoginForm } from '@/components/login/login-form';

export default function LoginScreen() {
  return (
    <SplitBackgroundLayout
      topImage={require('@/assets/images/login/purple-login.jpg')}
      overlayHeight="90%"
    >
      <LoginForm />
    </SplitBackgroundLayout>
  );
}
