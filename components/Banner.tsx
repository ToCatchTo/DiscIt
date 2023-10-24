import { customColors } from '@/styles/themes/mainThemeOptions';
import { Box, Typography } from '@mui/material';
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
  };

export const Banner: FC<Props> = (props) => {
    const { picturePath, level, href, pageName, title, perex } = props;

    return(
        <Box sx={{width: '100%', height: '100vh'}}>
            <Box sx={{ zIndex: 0, mt: '100px', ml: '140px', position: 'absolute' }}>
                <BreadcrumbsNavigation level={level} pageName={pageName} href={href} />
            </Box>
            <Box component='img' sx={{ width: '100%', height: '100%', zIndex: -1, position: 'absolute', left: 0}} alt='Banner obrázek' src={picturePath}>
            </Box>
            <Box sx={{ pt: '35vh', display: 'flex', rowGap: '15px', pl: '140px', flexDirection: 'column'}}>
                <Typography sx={{color: customColors.white, fontSize: '42px', fontWeight: 'bold'}}>
                    {title}
                </Typography>
                <Box sx={{ height: '2px', width: '750px', backgroundColor: customColors.white }}>
                </Box>
                <Typography sx={{color: customColors.white, fontSize: '26px', fontWeight: 400, maxWidth: '750px'}}>
                {perex}
                </Typography>
            </Box>
        </Box>    
    );
};