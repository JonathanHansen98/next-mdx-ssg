import React, { FunctionComponent, MouseEventHandler } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import package1SidebarContent from "../utils/package1Sidebar.json";
import Link from "next/link";
import { breakpoints, spacing } from "@/styles/mixins";
import { useMediaQuery } from "@/utils/useMediaQuery";

const SIDEBAR_WIDTH = 250;

const Root = styled.div<{ onHomePage: boolean }>`
  display: grid;
  grid-template-rows: 1fr;
  height: 100%;
  margin-top: 60px;
  grid-template-columns: 1fr;

  ${breakpoints.up("md")} {
    grid-template-columns: ${SIDEBAR_WIDTH}px 1fr;
  }

  ${breakpoints.up("lg")} {
    grid-template-columns: ${SIDEBAR_WIDTH}px 1fr ${SIDEBAR_WIDTH}px;
  }

  ${(props) => props.onHomePage && "grid-template-columns: 1fr;"}
`;

export const TopbarContainer = styled.div`
  max-width: calc(100% - ${spacing(2)}px);
  width: 100%;
  height: 100%;
  margin: 0 auto;

  ${breakpoints.up("md")} {
    max-width: calc(100% - ${SIDEBAR_WIDTH}px);
    margin-left: calc(${SIDEBAR_WIDTH}px - ${spacing(2)}px);
    margin-right: ${spacing(2)}px;
  }

  ${breakpoints.up("lg")} {
    max-width: calc(100% - ${SIDEBAR_WIDTH * 2}px);
    margin-left: calc(${SIDEBAR_WIDTH}px - ${spacing(2)}px);
    margin-right: calc(${SIDEBAR_WIDTH}px - ${spacing(2)}px);
  }
`;

const Content = styled.main`
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;

const TOCTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 16px;
`;

const TitleLink = styled(TOCTitle)`
  :hover {
    cursor: pointer;
  }
`;

const NavItem = styled.li`
  font-size: 1rem;
  font-weight: 500;
  padding: 0.5rem 0;
`;

const NavList = styled.ul`
  padding: 0;
`;

const SidebarContainer = styled.div<{ open: boolean }>`
  width: 100%;
  min-height: calc(100vh - 60px);
  position: fixed;
  z-index: 999;
  transform: ${(props) => (props.open ? "translateX(0)" : "translateX(-100%)")};
  transition: transform 0.3s ease-in-out;
  background-color: #121212;

  ${breakpoints.up("sm")} {
    width: ${SIDEBAR_WIDTH}px;
  }

  ${breakpoints.up("md")} {
    transform: translateX(0);
    height: 100%;
    position: static;
    z-index: 0;
  }
  /* @media (max-width: 768px) {
    position: fixed;
    height: 100%;
    z-index: 999;
    transform: ${(props) =>
    props.open ? "translateX(0)" : "translateX(-100%)"};

    transition: transform 0.3s ease-in-out;
  } */
`;

const Sidebar = styled.div`
  padding: 2rem 1rem;
  height: 100%;
`;

const TOC = styled.div`
  padding: 1rem;
  padding-top: 2rem;
  width: ${SIDEBAR_WIDTH}px;
  position: sticky;
  top: 0;
  right: 0;
  text-overflow: ellipsis;
`;

const Topbar = styled.div`
  height: 60px;
  border-bottom: 1px solid #19667e;
  width: 100%;
  background-color: #121212;

  color: #fff;
  font-size: 1rem;
  font-weight: 500;

  position: fixed;
  top: 0;
  z-index: 1000;
`;

const Navbar = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  height: 100%;
`;

const Search = styled.input`
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #19667e;
  background-color: #121212;
  color: #fff;
  font-size: 1rem;
  font-weight: 500;
  width: 100%;
`;

const Filler = styled.div`
  flex-grow: 1;
`;

interface SidebarContentBase {
  title: string;
  path: string;
  routes?: SidebarContentBase[];
}

interface SidebarContentProps {
  content: SidebarContentBase;
  sidebarOpen: boolean;
  isMobile: boolean;
  toggleSidebar: () => void;
}

const SidebarContent = ({
  content,
  sidebarOpen,
  isMobile,
  toggleSidebar,
}: SidebarContentProps) => {
  const router = useRouter();

  const handleRoute: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    const href = e.currentTarget.getAttribute("href");

    if (!href) return;

    if (isMobile && sidebarOpen) {
      toggleSidebar();
    }

    router.push(href);
  };

  return (
    <>
      <Link passHref href={content.path} legacyBehavior>
        <TitleLink>{content.title}</TitleLink>
      </Link>
      <NavList>
        {content.routes?.map((route) => (
          <NavItem key={route.path}>
            <Link onClick={handleRoute} href={route.path}>
              {route.title}
            </Link>
          </NavItem>
        ))}
      </NavList>
    </>
  );
};

const ToggleButton = styled.button`
  padding: 4px 8px;
`;

const Layout = ({ children }: { children?: React.ReactNode }) => {
  const sidebarContent = useSidebarContent();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const isMobile = useMediaQuery(breakpoints.down("sm"), () => {});

  const underMd = useMediaQuery(breakpoints.down("md"), () => {
    setSidebarOpen(false);
  });

  const isLgDesktop = useMediaQuery(breakpoints.up("lg"));

  const { asPath } = useRouter();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <div>
        <Topbar>
          <TopbarContainer>
            <Navbar>
              {underMd && (
                <ToggleButton
                  onClick={toggleSidebar}
                  style={{ padding: "4px 8px" }}
                >
                  {sidebarOpen ? "↖" : "↗"}
                </ToggleButton>
              )}
              <Link href="/">Home</Link>
              {!isMobile && (
                <div style={{ flexGrow: 1 }}>
                  <Search placeholder="Coming Soon!" disabled />
                </div>
              )}
              {isMobile && <Filler />}
              <Link href="/package1">Package 1</Link>
              <Link href="/package2/example">Package 2</Link>
            </Navbar>
          </TopbarContainer>
        </Topbar>

        <Root onHomePage={asPath === "/"}>
          {asPath !== "/" && (
            <SidebarContainer open={sidebarOpen}>
              <Sidebar>
                <SidebarContent
                  isMobile={isMobile}
                  sidebarOpen={sidebarOpen}
                  toggleSidebar={toggleSidebar}
                  content={sidebarContent}
                />
              </Sidebar>
            </SidebarContainer>
          )}

          <Content>{children}</Content>

          {asPath !== "/" && isLgDesktop && (
            <div>
              <TOC>
                <TOCTitle>Table of Contents</TOCTitle>
                <NavList>
                  <NavItem>
                    <a href="#heading1">Heading 1</a>
                  </NavItem>
                  <NavItem>
                    <a href="#heading2">Heading 2</a>
                  </NavItem>
                  <NavItem>
                    <a href="#heading3">Heading 3</a>
                  </NavItem>
                </NavList>
              </TOC>
            </div>
          )}
        </Root>
      </div>
    </>
  );
};

const useSidebarContent = (): SidebarContentBase => {
  const { asPath } = useRouter();

  if (asPath.startsWith("/package1")) {
    return package1SidebarContent;
  } else {
    return { title: "Home", path: "/" };
  }
};

export default Layout;
