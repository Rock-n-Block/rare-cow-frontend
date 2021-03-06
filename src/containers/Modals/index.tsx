import React, { VFC } from 'react';

import modalSelector from 'store/modals/selectors';

import {
  ApprovePendingModal,
  ApproveRejectedModal,
  ConnectWalletModal,
  SendPendingModal,
  SendRejectedModal,
  SendSuccessModal,
  Failed,
} from 'components';
import ApproveErrorModal from 'components/Modals/modals/ApproveErrorModal';

import { useModals, useShallowSelector } from 'hooks';
import { Modals } from 'types';
import SendErrorModal from 'components/Modals/modals/SendErrorModal';

const ModalsComponent: VFC = () => {
  const { modalType, closeModals } = useModals();
  const modalProps = useShallowSelector(modalSelector.getProp('modalProps'));

  return (
    <>
      <ApprovePendingModal
        visible={modalType === Modals.ApprovePending}
        onClose={() => closeModals()}
      />

      <ApproveErrorModal
        visible={modalType === Modals.ApproveError}
        onClose={() => closeModals()}
        onApproveAgain={'onApprove' in modalProps ? modalProps.onApprove : undefined}
      />

      <ApproveRejectedModal
        visible={modalType === Modals.ApproveRejected}
        onClose={() => closeModals()}
        onApproveAgain={'onApprove' in modalProps ? modalProps.onApprove : undefined}
      />
      <SendPendingModal
        subtitleText={
          'subtitleText' in modalProps
            ? modalProps.subtitleText
            : 'Please press "Send" button in MetaMask extension'
        }
        withSteps={'withSteps' in modalProps ? modalProps.withSteps : true}
        visible={modalType === Modals.SendPending}
        onClose={() => closeModals()}
      />
      <SendSuccessModal
        withSteps={'withSteps' in modalProps ? modalProps.withSteps : true}
        visible={modalType === Modals.SendSuccess}
        onClose={() => closeModals()}
      />
      <SendRejectedModal
        withSteps={'withSteps' in modalProps ? modalProps.withSteps : true}
        visible={modalType === Modals.SendRejected}
        onClose={() => closeModals()}
        onSendAgain={'onSendAgain' in modalProps ? modalProps.onSendAgain : undefined}
      />
      <SendErrorModal
        withSteps={'withSteps' in modalProps ? modalProps.withSteps : true}
        visible={modalType === Modals.SendError}
        onClose={() => closeModals()}
        onTryAgain={'onTryAgain' in modalProps ? modalProps.onTryAgain : undefined}
      />
      <ConnectWalletModal
        visible={modalType === Modals.ConnectWallet}
        onClose={() => closeModals()}
      />
      <Failed
        visible={modalType === Modals.Failed}
        onClose={() => closeModals()}
        title={'title' in modalProps ? modalProps.title : 'Failed'}
        error={'error' in modalProps ? modalProps.error : ''}
      />
    </>
  );
};

export default ModalsComponent;
