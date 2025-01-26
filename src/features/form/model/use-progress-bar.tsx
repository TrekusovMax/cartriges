import { Flex, Progress } from 'antd'

export const useProgressBar = () => {
  return (
    <Flex
      align="center"
      style={{
        width: '25%',
        //display: showProgress ? 'flex' : 'none',
      }}>
      <Progress
        //percent={progress}
        size="default"
        //status={uploadStatus}
      />
    </Flex>
  )
}
