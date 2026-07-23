import React from "react";

class ErrorBoundary extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            hasError: false,
            errorMessage: ""
        };
    }


    static getDerivedStateFromError(error) {

        return {
            hasError: true,
            errorMessage: error.message
        };

    }


    componentDidCatch(error, errorInfo) {

        console.log("Error:", error);
        console.log("Error Info:", errorInfo);

        // Send error to logging service
        // Example:
        // Sentry.log(error)

    }


    render() {

        if (this.state.hasError) {

            return (
                <div>
                    <h2>
                        Something went wrong
                    </h2>

                    <p>
                        {this.state.errorMessage}
                    </p>
                </div>
            );

        }


        return this.props.children;
    }

}


export default ErrorBoundary;