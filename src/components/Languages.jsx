import { useState, useContext } from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  MenuList,
} from "@mui/material";
import LanguageIcon from '@mui/icons-material/Language';
import CheckIcon from "@mui/icons-material/Check";
import CircleIcon from "@mui/icons-material/Circle";
import { LANGUAGES } from "../utils/languages";
import { useTranslation } from "react-i18next";

export default function LanguageSelector() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [showLanguages, setShowLanguages] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const { i18n, t } = useTranslation();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setShowLanguages(false);
  };

  const handleLanguagesClick = (event) => {
    {
      showLanguages ? setShowLanguages(false) : setShowLanguages(true);
    }
    event.stopPropagation();
  };

  const handleLanguageSelect = (event) => {
    setSelectedLanguage(event.target.accessKey);
    i18n.changeLanguage(event.target.accessKey);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setShowLanguages(false);
  };

  return (
    <>
      <IconButton color="inherit" onClick={handleClick}>
        <LanguageIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        keepMounted
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuList>
            {LANGUAGES.map(({ code, label }) => (
              <MenuItem
                key={code}
                accessKey={code}
                onClick={handleLanguageSelect}
              >
                {selectedLanguage === `${code}` ? (
                  <CheckIcon
                    fontSize="small"
                    sx={{ mr: 1, color: "primary.main" }}
                  />
                ) : (
                  <CircleIcon
                    sx={{ mx: 1.1, fontSize: "10px", color: "gray" }}
                  />
                )}
                {label}
              </MenuItem>
            ))}
          </MenuList>
      </Menu>
    </>
  );
}
