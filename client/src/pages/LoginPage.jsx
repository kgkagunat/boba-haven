// LoginPage.jsx
import AuthPage from '../components/AuthPage';

function LoginPage() {
    return <AuthPage 
        pageTitle="Log In"
        buttonText="Log In"
        bgColorGradient="bg-gradient-to-r from-white to-pink-400"
        redirectLink="/signup"
        bottomParagraphText="Don't have an account?"
        bottomLinkText="Sign Up Here"
    />;
}

export default LoginPage;