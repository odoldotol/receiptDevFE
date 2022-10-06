import './App.css';
import axios from 'axios';
import { useState } from "react";


function App() {

  const [workStatus, setWorkStatus] = useState("대기중...");
  const [response, setResponse] = useState("");

  return (
    <div className="App">
      <header className="App-header">
        <div className='form'>
          <form method="post" enctype="multipart/form-data" id='requestForm' name='requestForm'>
            <div>
              <label for="receiptImage">영수증 이미지 선택하기</label>
              <input type="file" accept="image/*" id="receiptImage" name="receiptImage" />
            </div>
            <div>
              <label for="sheetFormat">결과물 고르기</label>
              <select id="sheetFormat" name="sheetFormat">
                <option value="xlsx">엑셀파일</option>
              </select>
            </div>
            <div>
              <label for="receiptStyle">마트 알려주기</label>
              <select id="receiptStyle" name="receiptStyle">
                <option value="homeplus">홈플러스</option>
                <option value="emart">이마트</option>
                <option value="costco">코스트코</option>
                <option value="lottemart">롯데마트</option>
              </select>
            </div>
            <div>
              <label for="emailAddress">이메일</label>
              <input type="email" id="emailAddress" name="emailAddress" />
            </div>
            <div>
              <label for="password">비밀번호</label>
              <input type="password" id="password" name="password" />
            </div>
            <div>
              <button onClick={ async (e) => {
                e.preventDefault();
                setWorkStatus(`일 하는중... 잠시 기다려주세요.`);
                const requestForm = document.getElementById('requestForm');
                const requestFormData = new FormData(requestForm);
                await axios.post(`${process.env.REACT_APP_BE_URL}/receipt-to-sheet`, requestFormData)
                  .then((response) => {
                    setWorkStatus('');
                    // console.log('OK', response);
                    setResponse(JSON.stringify(response.data, null, 4));
                  })
                  .catch((error) => {
                    setWorkStatus('');
                    // console.log('ERROR', error);
                    // console.log(JSON.stringify(error.response.data));
                    setResponse(JSON.stringify(error.response.data, null, 4));
                  });
              }}>REQUEST</button>
            </div>
          </form>
        </div>
      </header>
      <body className='App-body'>
        <div className='workstatus'>
          <pre>{workStatus}</pre>
        </div>
        <div className='response'>
          <pre>{response}</pre>
        </div>
      </body>
    </div>
  );
}

export default App;
