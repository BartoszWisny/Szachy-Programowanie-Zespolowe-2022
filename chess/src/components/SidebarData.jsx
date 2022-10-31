import React from "react"
import * as FaIcons from "react-icons/fa"
import * as IoIcons from "react-icons/io"
import * as RiIcons from "react-icons/ri"
import * as GiIcons from "react-icons/gi"
import * as HiIcons from "react-icons/hi"
import * as BsIcons from "react-icons/bs"
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
    title: "Minigames",
    icon: <GiIcons.GiJigsawBox />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: "Daily challenge",
        path: "/minigames/daily",
        icon: <BsIcons.BsFillCalendarDateFill />
      },
      {
        title: "Puzzles",
        path: "/minigames/puzzles",
        icon: <HiIcons.HiPuzzle />
      }
    ]
  },
  {
    title: "Leaderboard",
    icon: <MdIcons.MdLeaderboard />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: "Games",
        path: "/leaderboard/games",
        icon: <FaIcons.FaChess />
      },
      {
        title: "Minigames",
        path: "/leaderboard/minigames",
        icon: <GiIcons.GiJigsawBox />
      }
    ]
  },
  {
    title: "Help",
    icon: <IoIcons.IoIosHelpCircle />,
    iconClosed: <RiIcons.RiArrowDownSFill/>,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: "Leave your feedback",
        path: "/help/feedback",
        icon: <MdIcons.MdFeedback />
      },
      {
        title: "Make a suggestion",
        path: "/help/suggestion",
        icon: <HiIcons.HiLightBulb />
      },
      {
        title: "Report a bug",
        path: "/help/bug",
        icon: <FaIcons.FaBug />
      }
    ]
  },
  {
    title: "About",
    path: "/about",
    icon: <FaIcons.FaInfoCircle />
  }
] 
