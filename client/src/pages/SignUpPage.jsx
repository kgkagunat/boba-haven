// SignUpPage.jsx
import AuthPage from '../components/AuthPage';

function SignUpPage() {
    return <AuthPage 
        pageTitle="Sign Up"
        buttonText="Sign Up"
        bgColorGradient="bg-gradient-to-r from-white to-blue-400"
        redirectLink="/login"
        bottomParagraphText="Already have an account?"
        bottomLinkText="Log In Here"
    />;
}

export default SignUpPage;