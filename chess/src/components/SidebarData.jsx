import React from "react"
import * as FaIcons from "react-icons/fa"
import * as IoIcons from "react-icons/io"
import * as RiIcons from "react-icons/ri"
import * as GiIcons from "react-icons/gi"
import * as HiIcons from "react-icons/hi"
import * as MdIcons from "react-icons/md"

export const SidebarData = [  
  {
    title: "Play",
    icon: <FaIcons.FaChessKing />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: "Play 1 vs 1 (online)",
        path: "/play/1vs1online",
        icon: <HiIcons.HiStatusOnline />
      },
      {
        title: "Play vs computer",
        path: "/play/vscomputer",
        icon: <FaIcons.FaRobot />
      },
      {
        title: "Play 1 vs 1 (offline)",
        path: "/play/1vs1offline",
        icon: <HiIcons.HiStatusOffline />
      },
      {
        title: "Play vs our chess AI",
        path: "/play/vsourchessai",
        icon: <GiIcons.GiArtificialIntelligence />
      }
    ]
  },
  {
    title: "Learn",
    icon: <FaIcons.FaGraduationCap />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: "Analyze games",
        path: "/learn/analyze",
        icon: <GiIcons.GiBookmarklet />
      },
      {
        title: "Watch games",
        path: "/learn/watch",
        icon: <GiIcons.GiBinoculars />
      }
    ]
  },
  {
    title: "Puzzles",
    path: "/puzzles",
    icon: <GiIcons.GiJigsawBox />
  },
  {
    title: "Leaderboards",
    path: "/leaderboards",
    icon: <MdIcons.MdLeaderboard />
  },
  {
    title: "Feedback",
    path: "/feedback",
    icon: <IoIcons.IoIosHelpCircle />
  },
  {
    title: "About",
    path: "/about",
    icon: <FaIcons.FaInfoCircle />
  }
] 
