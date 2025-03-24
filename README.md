# Developer Portfolio Website

A modern, responsive portfolio website for developers to showcase their projects in a product-style presentation. Built with HTML, CSS, and JavaScript, fully compatible with GitHub Pages.

![Portfolio Website Screenshot](assets/images/screenshot.png)

## Features

- 🌓 **Light/Dark Mode**: Toggle between light and dark themes.
- 📱 **Fully Responsive**: Looks great on all devices, from mobile to desktop.
- 🎨 **Modern Design**: Clean, professional, and intuitive UI.
- 📊 **Product-Style Project Showcase**: Present your projects like actual products with detailed specifications.
- 🔍 **Project Filtering**: Filter projects by technology or category.
- 🖼️ **Project Modals**: Detailed project views with galleries, features, and installation instructions.
- 📦 **3D Project Views**: Showcase your projects in 3D using Three.js (optional).
- 🌐 **GitHub Pages Compatible**: Fully static, no server-side code needed.
- 📝 **Contact Form**: HTML form with client-side validation.
- 🏆 **Awards & Recognition**: Timeline to display your achievements.

## Technologies Used

- **HTML5**: Semantic markup structure
- **CSS3**: Custom styling with CSS variables for theming
- **JavaScript**: Dynamic content loading and interactivity
- **Three.js**: Optional 3D views for projects
- **Font Awesome**: Icons
- **Google Fonts**: Typography

## Project Structure

```
portfolio/
│
├── index.html               # Home page
├── projects.html            # Projects listing page
├── about.html               # About me page
├── contact.html             # Contact page
│
├── assets/                  # Static assets
│   ├── images/              # Image files
│   ├── videos/              # Video files
│   └── icons/               # Icon files
│
├── data/                    # JSON data files
│   └── projects.json        # Project information
│
├── css/                     # Stylesheets
│   └── style.css            # Main stylesheet
│
├── js/                      # JavaScript files
│   ├── main.js              # Main JavaScript file
│   └── three-setup.js       # Three.js setup for 3D views
│
└── README.md                # Project documentation
```

## Getting Started

### Prerequisites

- A modern web browser
- Basic understanding of HTML, CSS, and JavaScript (for customization)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/portfolio.git
   ```

2. Navigate to the project directory:
   ```
   cd portfolio
   ```

3. Open `index.html` in your browser to view the site locally.

### Customization

1. **Personal Information**:
   - Update text in HTML files to include your information
   - Replace profile image in `/assets/images/`

2. **Projects**:
   - Edit `data/projects.json` to include your project details
   - Add project images to `/assets/images/`

3. **Styling**:
   - Customize colors and styling in `css/style.css`
   - Modify CSS variables at the top of the file to change theme colors

4. **3D Views** (Optional):
   - Customize 3D models in `js/three-setup.js`

## Deployment

### GitHub Pages

1. Push your code to a GitHub repository
2. Go to repository settings
3. Scroll to GitHub Pages section
4. Select the main branch as the source
5. Your site will be published at `https://yourusername.github.io/repositoryname/`

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Font Awesome for icons
- Google Fonts for typography
- Three.js for 3D rendering capabilities
