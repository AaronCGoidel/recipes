import styled, { keyframes } from 'styled-components';

const gradientFrames = keyframes`
  0% {
		background-position: 0% 50%
	}
	50% {
		background-position: 100% 50%
	}
	100% {
		background-position: 0% 50%
	}
`;

export const Gradient = styled.div`
  width: 100%;
  min-height: calc(100vh - ${props => props.hasNav ? '64px' : '0px'});
  margin-top: ${props => props.hasNav ? '64px' : '0px'};
  background: -webkit-linear-gradient(135deg, #EE7752, #E73C7E, #23A6D5, #23D5AB);
  background: linear-gradient(-45deg, #EE7752, #E73C7E, #23A6D5, #23D5AB);
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
          justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
          align-items: center;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
          flex-direction: column;
  background-size: 300% 300%;
  -webkit-animation: ${gradientFrames} 30s ease infinite;
          animation: ${gradientFrames} 30s ease infinite;
`;