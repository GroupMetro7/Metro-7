import { useNavigate } from "react-router-dom";

export default function NotFound() {
    const navigate = useNavigate();
    return (
        <div className="text-center">
            <h1 className="display-4">404 Not Found</h1>
            <p className="lead">The page you are looking for does not exist.</p>
            <button
                className="btn btn-primary"
                onClick={() => navigate(-1)}
            >
                Go Back
            </button>
        </div>
    );
}
