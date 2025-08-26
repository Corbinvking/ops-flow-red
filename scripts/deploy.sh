#!/bin/bash

# Deployment Script for Ops Flow Red
# This script handles both development and production deployments

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to check prerequisites
check_prerequisites() {
    print_status "Checking prerequisites..."
    
    if ! command_exists node; then
        print_error "Node.js is not installed. Please install Node.js 18+ first."
        exit 1
    fi
    
    if ! command_exists npm; then
        print_error "npm is not installed. Please install npm first."
        exit 1
    fi
    
    if ! command_exists git; then
        print_error "git is not installed. Please install git first."
        exit 1
    fi
    
    print_success "All prerequisites are satisfied"
}

# Function to install dependencies
install_dependencies() {
    print_status "Installing dependencies..."
    npm ci
    print_success "Dependencies installed successfully"
}

# Function to build the application
build_app() {
    print_status "Building application..."
    npm run build
    print_success "Application built successfully"
}

# Function to deploy to Vercel
deploy_to_vercel() {
    print_status "Deploying to Vercel..."
    
    if ! command_exists vercel; then
        print_warning "Vercel CLI not found. Installing..."
        npm install -g vercel
    fi
    
    # Check if user is logged in to Vercel
    if ! vercel whoami >/dev/null 2>&1; then
        print_warning "Not logged in to Vercel. Please log in first."
        vercel login
    fi
    
    # Deploy to Vercel
    if [ "$1" = "production" ]; then
        vercel --prod
    else
        vercel
    fi
    
    print_success "Deployed to Vercel successfully"
}

# Function to setup environment variables
setup_env() {
    print_status "Setting up environment variables..."
    
    if [ ! -f .env.local ]; then
        print_warning "Creating .env.local from template..."
        cp env.example .env.local
        print_warning "Please update .env.local with your actual API endpoints"
    fi
    
    print_success "Environment variables configured"
}

# Function to start development server
start_dev() {
    print_status "Starting development server..."
    npm run dev
}

# Function to run tests
run_tests() {
    print_status "Running tests..."
    npm run test
    print_success "Tests completed"
}

# Function to lint code
lint_code() {
    print_status "Linting code..."
    npm run lint
    print_success "Linting completed"
}

# Function to show help
show_help() {
    echo "Usage: $0 [COMMAND]"
    echo ""
    echo "Commands:"
    echo "  dev           Start development server"
    echo "  build         Build the application"
    echo "  deploy        Deploy to Vercel (staging)"
    echo "  deploy:prod   Deploy to Vercel (production)"
    echo "  setup         Setup development environment"
    echo "  test          Run tests"
    echo "  lint          Lint code"
    echo "  help          Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 dev              # Start development server"
    echo "  $0 deploy:prod      # Deploy to production"
    echo "  $0 setup            # Setup development environment"
}

# Main script logic
main() {
    case "${1:-help}" in
        "dev")
            check_prerequisites
            setup_env
            start_dev
            ;;
        "build")
            check_prerequisites
            install_dependencies
            build_app
            ;;
        "deploy")
            check_prerequisites
            install_dependencies
            build_app
            deploy_to_vercel "staging"
            ;;
        "deploy:prod")
            check_prerequisites
            install_dependencies
            build_app
            deploy_to_vercel "production"
            ;;
        "setup")
            check_prerequisites
            install_dependencies
            setup_env
            print_success "Development environment setup complete!"
            print_warning "Don't forget to:"
            print_warning "1. Update .env.local with your API endpoints"
            print_warning "2. Start your backend servers (ports 3000 and 3001)"
            print_warning "3. Run '$0 dev' to start the development server"
            ;;
        "test")
            check_prerequisites
            install_dependencies
            run_tests
            ;;
        "lint")
            check_prerequisites
            install_dependencies
            lint_code
            ;;
        "help"|*)
            show_help
            ;;
    esac
}

# Run main function with all arguments
main "$@"
