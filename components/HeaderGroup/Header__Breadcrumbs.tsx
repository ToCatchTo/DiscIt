import { ThemeProvider } from '@emotion/react';
import { Breadcrumbs, Typography } from '@mui/material';
import Link from 'next/link';
import { FC } from 'react';
import mainTheme, { customColors, generalVariables } from '@/styles/themes/mainThemeOptions';

type Props = {
  level: number;
  href: Array<string>;
  pageName: Array<string>;
};

export const BreadcrumbsNavigation: FC<Props> = (props) => {
  const { level, href, pageName } = props;

  return (
    <Breadcrumbs
    separator=">"
    aria-label="breadcrumb"
    sx={{ color: customColors.white}}
    >
    { pageName.map((pageName, i) => 
    <Typography>
      <Link style={{textDecoration: 'none', color: customColors.white}} href={href[i]}>
          {pageName}
      </Link>
    </Typography>)
    }
    </Breadcrumbs>
  );
};
