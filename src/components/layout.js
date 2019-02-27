import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'

import Header from './header'
import Hero from './hero'
import Footer from './footer'
import SEO from './seo'
import GlobalStyle from './GlobalStyle'

const LayoutContainer = styled.div`
  /* adding flexbox container to layout so the footer will be pushed to the bottom of the viewport / page no matter what */
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  main {
    flex: 1 0 auto;
    margin: 0 auto;
    max-width: 750px;

    ul {
      display: block;
      list-style-type: disc;
    }
    li {
      display: list-item;
      text-align: -webkit-match-parent;
      margin-left: 2em;
      padding-left: 5px;
      padding-bottom: 0.5em;
    }
  }
`

const Layout = props => {
  let { frontmatter } = props

  return (
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
              menuLinks {
                name
                link
              }
            }
          }
        }
      `}
      render={({ site }) => {
        let title

        if (frontmatter.title === site.siteMetadata.title) {
          // Set the title for the homepage to be "Home"
          title = 'Home'
        } else {
          title = frontmatter.title
        }

        return (
          <LayoutContainer>
            <GlobalStyle />
            <Header menuLinks={site.siteMetadata.menuLinks} />
            <SEO title={title} />
            <Hero frontmatter={frontmatter} />
            <main>{props.children}</main>
            <Footer />
          </LayoutContainer>
        )
      }}
    />
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
