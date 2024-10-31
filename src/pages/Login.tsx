interface LoginProps {
    theme: string;
}

export const Login: React.FC<LoginProps> = ({ theme }) => {
    return (
        <div className={`min-h-screen flex flex-col justify-center items-center ${theme === 'dark' ? ' text-white' : 'text-neutral-900'}`}>
            <p> Login</p>
        </div >
    );
};