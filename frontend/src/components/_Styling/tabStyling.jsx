import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Tabs, Tab } from '@mui/material';

export const NavTabs = styled(Tabs)({
    '& .MuiTabs-indicator': {
        backgroundColor: '#512da8',
    },
});

export const NavTab = styled((props) => <Tab disableRipple {...props} />)(({ theme }) => ({
    textTransform: 'none',
    padding: "0.5rem",
    minWidth: 0,
    fontSize:"11px",
    // [theme.breakpoints.up('md')]: {
    //     minWidth: 0,
    // },
    fontWeight: theme.typography.fontWeightRegular,
    color: 'rgba(0, 0, 0, 0.85)',
    '&:hover': {
        color: '#673ab7',
        opacity: 1,
    },
    '&.Mui-selected': {
        color: '#512da8',
        fontWeight: theme.typography.fontWeightMedium,
    },
    '&.Mui-focusVisible': {
        backgroundColor: '#d1eaff',
    },
}));

export const VerticalNavTab = styled((props) => <Tab disableRipple {...props} />)(({ theme }) => ({
    textTransform: 'none',
    padding: "0.5rem",
    minWidth: 0,
    // [theme.breakpoints.up('md')]: {
    //     minWidth: 0,
    // },
    fontWeight: theme.typography.fontWeightRegular,
    color: 'rgba(0, 0, 0, 0.85)',
    '&:hover': {
        color: '#673ab7',
        opacity: 1,
    },
    '&.Mui-selected': {
        color: 'black',
        fontWeight: theme.typography.fontWeightMedium,
        backgroundColor:"#d1c4e9",
    },
    '&.Mui-focusVisible': {
        backgroundColor: '#d1eaff',
    },
}));