import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import VolumeSection from './components/VolumeSection' // VolumeSection 컴포넌트를 추가해야합니다.
import EQSection from './components/EQSection' // EQSection 컴포넌트를 추가해야합니다.

const StyledNavigation = styled.nav`
  height: 100vh;
  width: 200px;
  background-color: blue;
  color: white;
  padding: 20px;
`

const StyledLink = styled(Link)`
  color: white;
  font-weight: bold;
  text-decoration: none;
  display: block;
  margin-bottom: 30px;
`

const Header = styled.header`
  display: flex;
  justify-content: left;
  padding: 1em;
  background-color: #f5f5f5;
  border-bottom: 1px solid #ddd;
`

const StyledButton = styled.button`
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  cursor: pointer;
  background-color: ${(props) => (props.connected ? 'green' : 'palevioletred')};

  &:hover {
    background-color: palegreen;
  }

  &:active {
    background-color: darkgreen;
  }
`

const Content = styled.div`
  flex-grow: 1;
  padding: 1em;
`

function App() {
  const [connected, setConnected] = useState(false) // 서버 연결 상태 표현을 위한 상태
  const [clientCount, setClientCount] = useState(0) // 접속된 클라이언트 수를 저장할 상태를 추가합니다.

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080')

    ws.onopen = () => {
      console.log('connected to server')
    }

    ws.onmessage = (message) => {
      console.log('received: %s', message.data)
      const data = JSON.parse(message.data) // 서버로부터 받은 메시지를 파싱합니다.
      if (data.clients !== undefined) {
        setClientCount(data.clients) // 접속된 클라이언트 수를 업데이트합니다.
        setConnected(data.clients > 0) // 클라이언트 수에 따라 연결 상태를 설정합니다.
      }
    }

    ws.onclose = () => {
      console.log('disconnected from server')
      setConnected(false) // 연결이 끊어진 경우 상태를 false로 변경합니다.
    }

    return () => {
      ws.close()
    }
  }, [])

  const serverStart = async () => {
    try {
      const response = await axios.get('http://localhost:3001/start')
      console.log(response.data)
    } catch (error) {
      console.error('There was an error!', error)
    }
  }

  const serverStop = async () => {
    try {
      const response = await axios.get('http://localhost:3001/stop')
      console.log(response.data)
    } catch (error) {
      console.error('There was an error!', error)
    }
  }

  return (
    <Router>
      <div className="App">
        <Header>
          <h1>접속된 클라이언트 수: {clientCount}</h1>{' '}
          {/* 접속된 클라이언트 수를 화면에 표시합니다. */}
          <StyledButton onClick={serverStart} connected={connected}>
            접속
          </StyledButton>
          <StyledButton onClick={serverStop}>서버 종료</StyledButton>
        </Header>
        <main style={{ display: 'flex' }}>
          <StyledNavigation>
            <StyledLink to="/volume">Volume Section</StyledLink>
            <StyledLink to="/eq">EQ Section</StyledLink>
          </StyledNavigation>
          <Content>
            <Routes>
              <Route path="/volume" element={<VolumeSection />} />
              <Route path="/eq" element={<EQSection />} />
            </Routes>
          </Content>
        </main>
      </div>
    </Router>
  )
}

export default App
