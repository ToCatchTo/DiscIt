import { customColors } from '@/styles/themes/mainThemeOptions';
import { Box, Typography, useTheme } from '@mui/material';
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
                [theme.breakpoints.down('md')]: { height: '50vh' },
                [theme.breakpoints.up('md')]: { height: '100vh' },
            }}>
                <Box sx={{
                    width: '100%', overflow: 'hidden', position: 'absolute', top: 0, zIndex: -1,
                    [theme.breakpoints.down('md')]: { height: '60%' },
                    [theme.breakpoints.up('md')]: { height: '100%' },
                }}>
                    <Box sx={{ zIndex: 0, mt: '30px', ml: '13%', position: 'absolute' }}>
                        <BreadcrumbsNavigation pageName={pageName} href={href} />
                    </Box>
                    <Box component='img' sx={{ width: '100%', height: '100%', objectFit: 'cover' }} alt='Banner obrázek' src={picturePath}>
                    </Box>
                    <Box sx={{ display: 'flex', rowGap: '15px', flexDirection: 'column', position: 'absolute',
                [theme.breakpoints.down('md')]: { pl: '7%', top: '30%' },
                [theme.breakpoints.up('md')]: { pl: '13%', top: '40%' },
                }}>
                        <Typography sx={{
                            color: customColors.white, fontWeight: 'bold',
                            [theme.breakpoints.down('md')]: { fontSize: '32px' },
                            [theme.breakpoints.up('md')]: { fontSize: '42px' },
                        }}>
                            {title}
                        </Typography>
                        <Box sx={{ height: '2px', width: '55%', backgroundColor: customColors.white }}>
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
                <Box sx={{ zIndex: 0, mt: '30px', ml: '13%' }}>
                    <BreadcrumbsNavigation pageName={pageName} href={href} black={true} />
                </Box>
                <Box sx={{ pt: '20px', display: 'flex', rowGap: '15px', pl: '13%', flexDirection: 'column', pr: '13%' }}>
                    <Typography sx={{ color: customColors.black, fontSize: '42px', fontWeight: 'bold' }}>
                        {title}
                    </Typography>
                    <Box sx={{ height: '2px', width: '100%', backgroundColor: customColors.black }}>
                    </Box>
                </Box>
            </Box>
    );
};