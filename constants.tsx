import React from "react"
import { RouteConfig } from "./types"
import {
  Home,
  CallSplit,
  MergeType,
  Settings,
  Info,
  AccountTree,
  BugReport,
  Science,
  SmartToy
} from "@mui/icons-material"
import DynamicPage from "./components/DynamicPage"
import AiAdvisor from "./components/AiAdvisor"

// Define the route configuration tree
export const APP_ROUTES: RouteConfig[] = [
  {
    id: "home",
    path: "/",
    title: "Dashboard",
    icon: Home,
    component: () => (
      <DynamicPage
        title="Dashboard"
        description="Welcome to the Branching Strategy Manager. Select a strategy from the sidebar to view details."
      />
    )
  },
  {
    id: "strategies",
    path: "/strategies",
    title: "Strategies",
    icon: AccountTree,
    component: () => (
      <DynamicPage
        title="Strategies Overview"
        description="Compare different git branching models."
      />
    ),
    children: [
      {
        id: "gitflow",
        path: "gitflow",
        title: "Git Flow",
        icon: CallSplit,
        component: () => (
          <DynamicPage
            title="Git Flow"
            description="A robust framework for managing large projects. Features develop, master, feature, release, and hotfix branches."
          />
        )
      },
      {
        id: "trunk-based",
        path: "trunk-based",
        title: "Trunk Based",
        icon: MergeType,
        component: () => (
          <DynamicPage
            title="Trunk Based Development"
            description="A source-control branching model where developers collaborate on code in a single branch called 'trunk' or 'main'."
          />
        )
      },
      {
        id: "feature-branch",
        path: "feature-branch",
        title: "Feature Branch",
        icon: Science,
        component: () => (
          <DynamicPage
            title="Feature Branch Workflow"
            description="The core idea is that all feature development should take place in a dedicated branch instead of the main branch."
          />
        )
      }
    ]
  },
  {
    id: "legacy",
    path: "/legacy",
    title: "Legacy Workflows",
    disabled: true,
    icon: BugReport,
    component: () => (
      <DynamicPage title="Legacy" description="This content is deprecated." />
    )
  },
  {
    id: "settings",
    path: "/settings",
    title: "Settings",
    icon: Settings,
    component: () => (
      <DynamicPage
        title="Settings"
        description="Application configuration parameters."
      />
    ),
    children: [
      {
        id: "general",
        path: "general",
        title: "General",
        component: () => (
          <DynamicPage
            title="General Settings"
            description="General app settings."
          />
        )
      },
      {
        id: "advanced",
        path: "advanced",
        title: "Advanced",
        component: () => (
          <DynamicPage
            title="Advanced Settings"
            description="Advanced configurations."
          />
        )
      }
    ]
  },
  {
    id: "about",
    path: "/about",
    title: "About",
    icon: Info,
    component: () => (
      <DynamicPage
        title="About"
        description="Version 1.0.0 - Built with React Router & Material UI."
      />
    )
  }
]
