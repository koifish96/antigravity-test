
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended
});

const eslintConfig = [
  ...compat.extends('next'), // 2. 플러그인 및 환경 설정
  ...compat.config({
    plugins: [
      'eslint-plugin-simple-import-sort', // 기존: import 정렬 플러그인
      'unused-imports' // 기존: 미사용 import 제거
    ],
    env: {
      // jest: true                          // 기존: Jest 테스트 환경
    }
  }), // 3. 커스텀 규칙 설정
  {
    rules: {
      // React 관련 규칙
      'react/no-unescaped-entities': 'off', // HTML 엔티티 미처리 허용
      '@next/next/no-page-custom-font': 'off', // 커스텀 폰트 경고 해제
      'react/self-closing-comp': [
        // 자동 닫기 태그 강제
        'error',
        {
          component: true,
          html: true
        }
      ],
      'react/jsx-first-prop-new-line': 'error', // JSX 첫 props 새줄 강제

      // 스타일 관련 규칙
      'comma-dangle': 'off', // 후행 쉼표 끄기
      '@typescript-eslint/comma-dangle': 'off', // TS 후행 쉼표 끄기
      indent: ['off'], // 들여쓰기 자동 포맷팅 끄기
      quotes: ['error', 'single'], // 싱글 쿼트 강제
      'eol-last': 'error', // 파일 끝 빈줄 강제
      semi: ['error', 'always'], // 세미콜론 강제

      // Import 정렬 규칙
      'simple-import-sort/imports': 'error', // import 자동 정렬
      'simple-import-sort/exports': 'error', // export 자동 정렬

      // 미사용 변수/Import 관리
      'no-unused-vars': 'off', // 기본 미사용 변수 끄기
      'unused-imports/no-unused-imports': [
        // TS 미사용 import 제거
        'error'
      ],

      // 스페이싱 규칙
      'comma-spacing': [
        // 쉼표 앞뒤 공백 규칙
        'error',
        {
          before: false,
          after: true
        }
      ]
    }
  },

];

export default eslintConfig;
