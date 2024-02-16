import { customColors } from '@/styles/themes/mainThemeOptions';
import { Box, Hidden, Typography, useTheme } from '@mui/material';
import * as React from 'react';
import { FC } from 'react';
import { BreadcrumbsNavigation } from './HeaderGroup/Header__Breadcrumbs';

type Props = {
    level: number;
    href: Array<string>;
    pageName: Array<string>;
    picturePath: string;
    title: string;
    perex: string;
    imgBg: boolean;
};

export const Banner: FC<Props> = (props) => {
    const { picturePath, href, pageName, title, perex, imgBg } = props;

    const theme: any = useTheme();

    return (
        imgBg ?
            <Box sx={{
                width: '100%',
                [theme.breakpoints.down('md')]: { height: '60vh' },
                [theme.breakpoints.up('md')]: { height: '100vh' },
                [theme.breakpoints.down(400)]: { height: '70vh' },
            }}>
                <Box sx={{
                    width: '100%', overflow: 'hidden', position: 'absolute', top: 0, zIndex: -1,
                    [theme.breakpoints.down('md')]: { height: '60vh' },
                    [theme.breakpoints.up('md')]: { height: '110vh' },
                    [theme.breakpoints.down(400)]: { height: '72vh' },
                }}>
                    <Hidden mdDown>
                        <Box sx={{ zIndex: 0, mt: '30px', ml: '13%', position: 'absolute', top: '10%' }}>
                            <BreadcrumbsNavigation pageName={pageName} href={href} />
                        </Box>
                    </Hidden>
                    <Box component='img' sx={{ width: '100%', height: '100%', objectFit: 'cover' }} alt='Banner obrázek' src={picturePath}>
                    </Box>
                    <Box sx={{
                        display: 'flex', rowGap: '15px', flexDirection: 'column', position: 'absolute', padding: '0 13%', top: '35%',
                        [theme.breakpoints.down('md')]: { padding: '0 7%', top: '30%' },
                        [theme.breakpoints.down(480)]: { textAlign: 'center', alignItems: 'center', rowGap: '5px', top: '25%' },
                    }}>
                        <Typography sx={{
                            color: customColors.white, fontWeight: 'bold',
                            [theme.breakpoints.down('md')]: { fontSize: '31px' },
                            [theme.breakpoints.up('md')]: { fontSize: '42px' },
                        }}>
                            {title}
                        </Typography>
                        <Box sx={{ height: '2px', width: '80%', backgroundColor: customColors.white }}>
                        </Box>
                        <Typography sx={{
                            color: customColors.white, fontWeight: 400, maxWidth: '80%',
                            [theme.breakpoints.down('md')]: { fontSize: '18px' },
                            [theme.breakpoints.up('md')]: { fontSize: '26px' },
                        }}>
                            {perex}
                        </Typography>
                    </Box>
                </Box>
            </Box>
            :
            <Box>
                <Hidden mdDown>
                    <Box sx={{ zIndex: 0, mt: '30px', ml: '13%', }}>
                        <BreadcrumbsNavigation pageName={pageName} href={href} black={true} />
                    </Box>
                </Hidden>
                <Box sx={{
                    padding: '20px 13% 0px 13%', display: 'flex', rowGap: '15px', flexDirection: 'column',
                    [theme.breakpoints.down('md')]: { padding: '20px 7% 0px 7%' },
                }}>
                    <Typography sx={{ color: customColors.black, fontSize: '42px', fontWeight: 'bold',
                    [theme.breakpoints.down('md')]: {fontSize: '30px'}}}>
                        {title}
                    </Typography>
                    <Box sx={{ height: '2px', width: '100%', backgroundColor: customColors.black }}>
                    </Box>
                </Box>
            </Box>
    );
};