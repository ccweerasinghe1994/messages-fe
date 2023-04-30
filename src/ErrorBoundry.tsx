import { Component } from 'react';

interface IErrorBoundaryProps {
	fallback: JSX.Element;
	children: JSX.Element;
}

interface IErrorBoundaryState {
	hasError: boolean;
}

class ErrorBoundary extends Component<
	IErrorBoundaryProps,
	IErrorBoundaryState
> {
	constructor(props: IErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error: Error) {
		console.error(error);

		// Update state so the next render will show the fallback UI.
		return { hasError: true };
	}

	componentDidCatch(error: Error, info: { componentStack: string }) {
		// let's add red color to the error message
		console.error('%c' + error.message, 'color: #22ff00');

		// Example "componentStack":
		//   in ComponentThatThrows (created by App)
		//   in ErrorBoundary (created by App)
		//   in div (created by App)
		//   in App
		// logErrorToMyService(error, info.componentStack);
	}

	render() {
		if (this.state.hasError) {
			// You can render any custom fallback UI
			return this.props.fallback;
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
