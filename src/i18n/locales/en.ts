// Demo-specific i18n messages - English
// This file contains messages ONLY for the demo application
// These messages will NOT be published with the registry

export default {
  dashboard: {
    welcome: 'Welcome back, {name}!',
    subtitle: 'This is your dashboard. You\'re viewing a demo of the Vue Blocks Registry authentication system.',
    stats: {
      user_id: 'User ID',
      email: 'Email',
      status: 'Status',
      session: 'Session',
    },
    status_values: {
      active: 'Active',
      inactive: 'Inactive',
      valid: 'Valid',
    },
    quick_actions: {
      title: 'Quick Actions',
      change_password: {
        title: 'Change Password',
        description: 'Update your account password',
      },
      view_demo: {
        title: 'View Demo',
        description: 'Explore component demos',
      },
      auth_components: {
        title: 'Auth Components',
        description: 'View authentication module',
      },
    },
    user_info: {
      title: 'User Information',
      full_name: 'Full Name',
      email_address: 'Email Address',
      user_id: 'User ID',
      auth_status: 'Authentication Status',
      authenticated: 'Authenticated',
      not_provided: 'Not provided',
      profile_picture: 'Profile Picture',
      avatar_generated: 'Auto-generated from UI Avatars',
    },
    demo_mode: {
      title: 'Demo Mode Active',
      description: 'This dashboard is part of the Vue Blocks Registry demo. You\'re logged in with mock authentication. All data is stored in-memory and will be reset on page refresh.',
    },
  },
  demo: {
    auth: {
      menu: {
        variants: 'Variants',
        login_standard: 'Standard Login',
        login_official: 'Official Login',
      },
      docs_link: 'Auth Docs',
    },
    hero: {
      welcome: 'Welcome to',
      subtitle: 'Discover our collection of ready-to-use UI components, designed for modern Vue.js applications',
      tech_stack: 'Using Tailwind CSS, Shadcn Vue, Vee Validate, Zod...',
      get_started: 'Get Started',
      view_components: 'View Components'
    },
    overview: {
      buttons: {
        title: 'Buttons',
        description: 'Various button styles with variants and vibrations'
      },
      links: {
        title: 'Links',
        description: 'Link components with hover effects and smooth transitions'
      },
      layout: {
        title: 'Layout',
        description: 'Layout and container components'
      },
      dataTable: {
        title: 'Data Table',
        description: 'Advanced table with sorting and filtering'
      }
    },
    sidebar: {
      getting_started: 'Getting Started',
      overview: 'Overview',
      introduction: 'Introduction',
      components: 'Components',
      button: 'Button',
      links: 'Links',
      layout: 'Layout',
      data_table: 'Data Table',
      examples: 'Examples',
      dashboard: 'Dashboard',
      authentication: 'Authentication'
    },
    introduction: {
      title: 'Introduction',
      description: 'Get to know Vue Blocks Registry - a modular Vue 3 component system',
      intro_text: 'Vue Blocks Registry is a modular Vue 3 component system with ready-made UI solutions, layouts, and functionalities.',
      what_is_title: 'What is Vue Blocks Registry?',
      what_is_p1: "Vue Blocks Registry is not a component library. It's a collection of reusable components that you can copy and paste into your applications or add via CLI.",
      what_is_p2: 'Similar to shadcn/ui, the code is yours. You can customize it to your needs.',
      features_title: 'Main Features',
      features: {
        ui_components: {
          title: 'UI Components',
          items: ['Buttons with variants', 'Forms and inputs', 'Cards and containers', 'Tables and lists']
        },
        layouts: {
          title: 'Layouts',
          items: ['PublicLayout', 'AuthenticatedLayout', 'GuestLayoutCentered', 'GuestLayoutTwoColumns']
        },
        auth_modules: {
          title: 'Auth Modules',
          items: ['Login/Register', 'Password Reset', 'Change Password', 'Protected Routes']
        },
        data_table: {
          title: 'Data Table',
          items: ['Sorting', 'Filtering', 'Pagination', 'Responsive']
        }
      },
      technologies_title: 'Technologies',
      tech: {
        frontend: 'Frontend',
        frontend_items: ['Vue 3', 'TypeScript', 'Tailwind CSS', 'Reka UI'],
        tools: 'Tools',
        tools_items: ['Vite', 'Vue Router', 'Pinia', 'Vee Validate + Zod']
      },
      installation_title: 'Installation',
      installation: {
        step1: {
          title: '1. Create project',
          description: 'Start by creating a new Vue project using Vite:'
        },
        step2: {
          title: '2. Add Tailwind CSS',
          description: 'Replace everything in {file} with:'
        },
        step3: {
          title: '3. Edit tsconfig.json and tsconfig.app.json',
          sections: {
            tsconfig: 'Add {baseUrl} and {paths} to the {compilerOptions} section in {tsconfig} and {tsconfigApp} files:',
            tsconfigApp: 'Add the following code to the {tsconfigApp} file to resolve paths, for your IDE:',
          }
        },
        step4: {
          title: '4. Update vite.config.ts',
          description: 'Add the following code to {file}:'
        },
        step5: {
          title: '5. Run CLI',
          description: 'Run the {command} command to configure your project:'
        },
        step6: {
          title: '6. Add components',
          description: 'You can now start adding components to your project:'
        }
      },
      get_started_title: 'Get Started',
      get_started_text: 'Choose a component category from the sidebar on the left to see examples and code.',
      view_components: 'View Components',
      github_repo: 'GitHub Repository'
    },
    components_page: {
      title: 'Components',
      description: 'Choose a component from the list below or use sidebar navigation.'
    },
    examples_page: {
      title: 'Examples',
      description: 'Examples of using components in real-world scenarios.',
      i18n_example: {
        title: 'Internationalization (i18n)',
        description: 'Multi-language support with PL/EN translations'
      },
      settings_example: {
        title: 'Settings',
        description: 'Demo settings integration'
      },
      user_example: {
        title: 'User',
        description: 'Profile and profile edit pages'
      },
      logs_example: {
        title: 'Logs',
        description: 'Logs browser with DataTable'
      }
    },
    dashboard_example: {
      title: 'Dashboard Example',
      description: 'Example dashboard with navigation components, widgets and other elements',
      coming_soon: 'Coming soon... Dashboard example will be available here.',
      view_existing: 'View Existing Dashboard'
    },
    auth_example: {
      title: 'Authentication Module',
      description: 'Complete authorization module with login, registration and password management forms',
      available_components: 'Available Components',
      components: {
        login_form: {
          title: 'Login Form',
          description: 'Login form with validation'
        },
        register_form: {
          title: 'Register Form',
          description: 'Registration form with password confirmation'
        },
        forgot_password: {
          title: 'Forgot Password',
          description: 'Password reset form'
        },
        reset_password: {
          title: 'Reset Password',
          description: 'New password setup form'
        },
        change_password: {
          title: 'Change Password',
          description: 'Password change form for logged-in users'
        }
      },
      mock_api_info: 'App runs in demo mode with mock API (no real backend). You can test all auth features!',
      features_title: 'Features',
      features: {
        pinia_store: 'Pinia store for auth state management',
        composables: 'Composables (useAuth, useLogout)',
        validation: 'Form validation with Zod and VeeValidate',
        api_integration: 'API integration (axios)',
        typescript: 'TypeScript types for User and Credentials',
        persistence: 'LocalStorage persistence for JWT token'
      },
      demo_mode: {
        title: 'Demo Mode - Mock API Active',
        description: 'App runs in demo mode with mock API (no real backend). You can test all auth features!',
        test_accounts: 'Test accounts:',
        email: 'Email:',
        password: 'Password:',
        register_info: 'You can also register a new account - it will be saved in browser memory (session only)'
      },
      installation: {
        title: 'Installation',
        full_module: {
          title: 'Full module (with UI):',
          description: 'Includes pages, forms, layouts, store, services and all dependencies'
        },
        feature_only: {
          title: 'Feature only (without UI):',
          description: 'Includes only store, services, composables and validation - no UI components'
        }
      },
      production_config: {
        title: 'Production Configuration',
        description: 'To connect a real backend API, change in the',
        file: '.env',
        file_text: 'file:',
        backend_endpoints: 'Backend must provide endpoints:'
      },
      how_to_use: {
        title: 'How to Use',
        description: 'Auth module is available in'
      }
    },
    showcase: {
      preview: 'Preview',
      installation: 'Installation',
      examples: 'Examples',
      button: {
        title: 'Button',
        description: 'Displays a button or a component that looks like a button.',
        click_me: 'Click me',
        variants: {
          title: 'Variants',
          primary: 'Primary',
          outline: 'Outline',
          destructive: 'Destructive',
          secondary: 'Secondary',
          ghost: 'Ghost',
          link: 'Link'
        },
        vibes: {
          title: 'Vibes (Unique Feature ✨)',
          description: 'Our Button component includes unique "vibe" animations that add extra visual appeal.',
          primary: 'Primary Vibe',
          outline: 'Outline Vibe',
          underline: 'Underline Vibe'
        },
        sizes: {
          title: 'Sizes',
          small: 'Small',
          default: 'Default',
          large: 'Large'
        },
        states: {
          title: 'States',
          normal: 'Normal',
          loading: 'Loading',
          disabled: 'Disabled'
        }
      },
      link: {
        title: 'Links',
        description: 'Router links with hover effects and smooth transitions.',
        navigate_demo: 'Navigate to Demo',
        external_link: 'External Link',
        hover_link: {
          title: 'HoverLink',
          description: 'Internal router link with animated underline on hover.',
          view_components: 'View Components'
        },
        hover_link_external: {
          title: 'HoverLinkExternal',
          description: 'External link with icon and hover animation.',
          vue_docs: 'Vue.js Documentation',
          github: 'GitHub'
        },
        button_link: {
          title: 'ButtonLink',
          description: 'Router link styled as a button. Combines Button component with RouterLink functionality.',
          primary: 'Primary Link',
          outline: 'Outline Link',
          secondary: 'Secondary Link'
        },
        button_link_vibes: {
          title: 'ButtonLink with Vibes ✨',
          description: 'ButtonLink also supports unique "vibe" animations.',
          primary: 'Primary Vibe',
          outline: 'Outline Vibe',
          underline: 'Underline Vibe'
        }
      },
      layout: {
        title: 'Layout Components',
        description: 'Layout, navigation and utility components for building professional applications',
        scroll_to_top: {
          title: 'ScrollToTop',
          description: 'Fixed button appears after scroll > 300px with smooth scroll behavior',
          scroll_info: 'Scroll down the page to see the ScrollToTop button in the bottom right corner'
        },
        page_card: {
          title: 'PageCard',
          description: 'Wrapper for content with consistent padding and styling',
          example_title: 'Example Card Content',
          example_text: 'This is example PageCard content. You can place any content here, tables, forms, etc.'
        },
        page_list_header: {
          title: 'PageListHeader',
          description: 'Header for list pages with title, count badge and actions slot',
          users: 'Users',
          users_description: 'List of all users in the system',
          add_user: 'Add User',
          example_list: '(Example user list...)'
        },
        page_list_wrapper: {
          title: 'PageListWrapper',
          description: 'Combination of PageCard + PageListHeader in one component',
          projects: 'Projects',
          projects_description: 'All active projects',
          filter: 'Filter',
          new_project: 'New Project',
          project_alpha: 'Project Alpha',
          project_beta: 'Project Beta',
          project_gamma: 'Project Gamma'
        },
        available_layouts: {
          title: 'Available Layouts',
          description: 'Vue Blocks Registry offers 5 ready-to-use layouts',
          view_link: 'View components',
          public_layout: {
            title: 'PublicLayout',
            description: 'Simple layout for landing pages and public pages'
          },
          authenticated_layout: {
            title: 'AuthenticatedLayout',
            description: 'Advanced layout with MainNav, UserNav and dark mode toggle'
          },
          guest_centered: {
            title: 'GuestLayoutCentered',
            description: 'Centered layout with gradient background for auth pages'
          },
          guest_glass: {
            title: 'GuestLayoutCenteredGlass',
            description: 'Glass-morphism effect + background image support'
          },
          guest_two_columns: {
            title: 'GuestLayoutTwoColumns',
            description: 'Split-screen design with branding panel on the left'
          }
        }
      },
      data_table: {
        title: 'DataTable',
        description: 'Advanced table with sorting, filtering, pagination, and row selection powered by TanStack Table',
        full_featured: {
          title: 'Full Featured Table',
          description: 'Table with sorting (click Email header), filtering, pagination, row selection, column visibility toggle, and action menu'
        },
        filter_placeholder: 'Filter emails...',
        features: {
          title: 'Features Included',
          sorting: {
            title: 'Sorting',
            description: 'Click column headers to sort ascending/descending'
          },
          filtering: {
            title: 'Filtering',
            description: 'Search/filter by column values (email in this example)'
          },
          pagination: {
            title: 'Pagination',
            description: 'Navigate through pages with Previous/Next buttons'
          },
          row_selection: {
            title: 'Row Selection',
            description: 'Select rows with checkboxes (individual or select all)'
          },
          column_visibility: {
            title: 'Column Visibility',
            description: 'Toggle column visibility with "Columns" dropdown'
          },
          action_menu: {
            title: 'Action Menu',
            description: 'Per-row actions with dropdown menu (3-dot icon)'
          }
        },
        tech_stack: {
          title: 'Technology Stack'
        },
        usage: {
          title: 'Basic Usage'
        }
      }
    }
  },
  navigation: {
    home: 'Home',
    dashboard: 'Dashboard',
    profile: 'Profile',
    settings: 'Settings',
    about: 'About',
    contact: 'Contact',
    docs: 'Docs',
    components: 'Components',
    examples: 'Examples'
  },
  validation: {
    required: 'This field is required',
    email: 'Please enter a valid email address',
    min_length: 'Must be at least {min} characters',
    max_length: 'Must be at most {max} characters',
    password_mismatch: 'Passwords do not match',
    invalid_format: 'Invalid format'
  },
}
