import { Link } from 'react-router-dom'

export const LandingPage: React.FC = () => {
    return <div>
        <p>This is the landing page.</p>
        
        <Link to="training">Try the training.</Link>
    </div>
}