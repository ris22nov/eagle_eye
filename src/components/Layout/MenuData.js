import InboxIcon from '@mui/icons-material/Inbox';
import OutboxIcon from '@mui/icons-material/Outbox';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SummarizeIcon from '@mui/icons-material/Summarize';
import ScannerIcon from '@mui/icons-material/Scanner';
import SmsIcon from '@mui/icons-material/Sms';

const MenuData = [
{
    text: "DASHBOARD",
    icon: <DashboardIcon color="Secondary" />,
    path: "/"
},    
{
    text: "INWARD",
    icon: <InboxIcon color="Secondary" />,
    submenu: [
    {
        text: "DASHBOARD",
        icon: <DashboardIcon color="Secondary" />,
        path: "/inward/dashboard"
    },
    {
        text: "TALLY REPORT",
        icon: <SummarizeIcon color="Secondary" />,
        path: "/inward/tallyreport"
    }
    ]
},
{
    text: "OUTWARD",
    icon: <OutboxIcon color="Secondary" />,
    submenu: [
        {
            text: "DASHBOARD",
            icon: <DashboardIcon color="Secondary" />,
            path: "/outward/dashboard"
        },
        {
            text: "PRESENTATION",
            icon: <FilePresentIcon color="Secondary" />,
            path: "outward/presentation"
        },
        {
            text: "SCANNING",
            icon: <ScannerIcon color="Secondary" />,
            path: "outward/scanning"
        }
    ]

},
{
    text: "CPPS",
    icon: <SmsIcon color="Secondary" />,
    path: "/cpps"
}]

export default MenuData;