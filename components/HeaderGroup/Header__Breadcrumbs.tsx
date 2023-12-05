import { ThemeProvider } from '@emotion/react';
import { Breadcrumbs, Typography } from '@mui/material';
import Link from 'next/link';
import { FC } from 'react';
import mainTheme, { customColors, generalVariables } from '@/styles/themes/mainThemeOptions';

type Props = {
  href: Array<string>;
  pageName: Array<string>;
  black?: boolean;
};

export const BreadcrumbsNavigation: FC<Props> = (props) => {
  const { href, pageName, black } = props;

  return (
    <Breadcrumbs
    separator=">"
    aria-label="breadcrumb"
    sx={{ color: black ? customColors.black : customColors.white }}
    >
    { pageName.map((pageName, i) => 
    <Typography>
      <Link style={{textDecoration: 'none', color: black ? customColors.black : customColors.white }} href={href[i]}>
          {pageName}
      </Link>
    </Typography>)
    }
    </Breadcrumbs>
  );
};
