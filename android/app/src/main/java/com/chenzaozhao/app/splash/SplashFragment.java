package com.chenzaozhao.app.splash;

import android.app.Dialog;
import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.DialogFragment;
import com.chenzaozhao.app.R;

public class SplashFragment extends DialogFragment {
    @NonNull
    @Override
    public Dialog onCreateDialog(@Nullable Bundle savedInstanceState) {
        setStyle(STYLE_NO_FRAME, R.style.SplashTheme);
        setCancelable(false);
        return super.onCreateDialog(savedInstanceState);
    }
}
