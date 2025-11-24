/**
 * @organization Console Art Cybernetic - https://cacybernetic.github.io
 * @fileoverview Displays main information for the first time.
 * @author Obrymec - https://obrymec.vercel.app
 * @stack Vite + React + Typescript
 * @supported DESKTOP, MOBILE
 * @created 2025-11-13
 * @updated 2025-11-24
 * @version 0.0.3
 * @file home.tsx
 */

// React dependencies.
import {MdArrowBackIosNew, MdOutlineSend, MdError} from "react-icons/md";
import {ReactElement, useEffect, useState} from "react";
import {SiSocketdotio} from "react-icons/si";
import {PiWarningFill} from "react-icons/pi";
import {FcInfo} from "react-icons/fc";

// Plugin dependencies.
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";

// Chakra dependencies.
import {
  SwitchCheckedChangeDetails,
  SelectRootProps,
  ListCollection,
  ButtonProps,
  Switch,
  Image,
  Text,
  Flex,
  Icon,
  Box
} from "@chakra-ui/react";

// Custom dependencies.
import {SOCKET_MONITOR_SAVE_KEY} from "@/common/constants/storage_keys.ts";
import TextWithLine from "@/common/components/displays/text_with_line.tsx";
import {loadFormData, JSObject} from "@/common/libraries/std.ts";
import CustomButton from "@/common/components/forms/button.tsx";
import Section from "@/common/components/layout/section.tsx";
import {SocketManager} from "@/common/libraries/socket.ts";
import {GLOBAL_LANG} from "@/common/i18n/localization.ts";
import {FeedbackType} from "@/common/libraries/socket.ts";
import {scrollTo} from "@/common/libraries/scroll.ts";
import {RootState} from "@/common/states/store.ts";
import favicon from "/favicon.png";
import Dropdown, {
  DropdownData
} from "@/common/components/forms/dropdown.tsx";
import TextField, {
  TextFieldProps
} from "@/common/components/forms/input.tsx";
import {
  SCROLL_BOTTOM_ID,
  SF_MONO_REGULAR,
  BREAKPOINT_480,
  SF_SEMI_BOLD,
  SF_MEDIUM
} from "@/common/constants/variables.ts";

// View types.
type MonitorData = {
  socketUrl?: (string | null),
  message?: (string | null),
  isAutoConnect?: boolean
};

// Shows importante information for the first time.
export default function Home () {
  // Attributes.
  const [socket, setSocket] = useState<SocketManager<JSObject> | null>(null);
  const [isAutoConnect, autoConnect] = useState<boolean>(false);
  const {t} = useTranslation<string, undefined>(GLOBAL_LANG);
  const [isConnected, connect] = useState<boolean>(false);
  const [socketUrl, setSocketUrl] = useState<string>('');
  const [isLoaded, setLoaded] = useState<boolean>(false);
  const [isExpanded, expand] = useState<boolean>(true);
  const [logs, setLogs] = useState<Array<string>>([]);
  const [message, setMessage] = useState<string>('');
  const [logDisplay, setLogoDisplay] = useState<DropdownData<unknown>>({
    value: t("showAllLogs"), key: t("showAllLogs")
  });
  const windowWidth: number = useSelector(
    (state: RootState): number => state.app.windowWidth
  );

  // Saves contact data form to browser local storage.
	const saveData = (): void => window.localStorage.setItem(
    SOCKET_MONITOR_SAVE_KEY, JSON.stringify({
      isAutoConnect, socketUrl, message
    })
  );

  // Called when a message has been received from server socket.
  const onMessageReceived = (data?: (JSObject | null)): void => {
    // Scrolls to full bottom.
    window.setTimeout((): void => scrollTo(SCROLL_BOTTOM_ID), 128);
    // Makes a log message.
    setLogs((oldLogs: string[]): string[] => [
      ...oldLogs,
      `ℹ️ ${t("messageReceiveLog")}: ${JSON.stringify(data, null, 2)}`
    ]);
  };

  // Called when socket connection has been closed.
  const onConnectionClosed = (): void => {
    // Scrolls to full bottom.
    window.setTimeout((): void => scrollTo(SCROLL_BOTTOM_ID), 128);
    // Sets connection state.
    connect(false);
    // Makes a log message.
    setLogs((oldLogs: string[]): string[] => [
      ...oldLogs, `⚠️ ${t("socketConnectionLost")}`
    ]);
  };

  // Called when socket connection failed or error throw during handling.
  const onUnknownErrorOccurred = (): void => {
    // Scrolls to full bottom.
    window.setTimeout((): void => scrollTo(SCROLL_BOTTOM_ID), 128);
    // Sets connection state.
    connect(false);
    // Makes a log message.
    setLogs((oldLogs: string[]): string[] => [
      ...oldLogs, `❌ ${t("requestErrorDesc")}`
    ]);
  };

  // Called when socket connection has been established.
  const onConnectionEstalished = (): void => {
    // Scrolls to full bottom.
    window.setTimeout((): void => scrollTo(SCROLL_BOTTOM_ID), 128);
    // Sets connection state.
    connect(true);
    // Makes a log message.
    setLogs((oldLogs: string[]): string[] => [
      ...oldLogs, `✅ ${t("connectionEstablished")}`
    ]);
  };

  // Sends common input fields style.
  const getInputFieldCommonStyle = (): TextFieldProps => ({
    mandatory: true,
    fieldStyle: {
      boxShadow: "none",
      paddingBottom: 2,
      borderRadius: 4,
      paddingTop: 2,
      type: "text"
    }
  });

  // Loads contact data from browser local storage.
	const loadData = (): void => {
		// Gets saved string from browser local storage.
		const data: (MonitorData | null) = loadFormData(SOCKET_MONITOR_SAVE_KEY);
		// Whether we have something.
		if (data != null) {
      // Gets socket auto connection.
      autoConnect(data?.isAutoConnect ?? isAutoConnect);
			// Gets socket url.
			setSocketUrl(data?.socketUrl ?? socketUrl);
      // Gets message.
      setMessage(data?.message ?? message);
		}
		// Updates load state.
		setLoaded(true);
	};

  // Emits a message to connected server web socket io.
  const emitMessage = (): void => {
    // The payload to be submit.
    let payload: unknown = null;
    // Tries to check whether message is an object.
    try {
      // Converts given message into json.
      payload = JSON.parse(message);
    // An error throw.
    } catch {
      // Generates a default object to wrap message.
      payload = {payload: message};
    }
    // Scrolls to full bottom.
    window.setTimeout((): void => scrollTo(SCROLL_BOTTOM_ID), 128);
    // Sends a message to web socket server.
    socket?.emit<unknown>(payload);
    // Makes a log message.
    setLogs((oldLogs: string[]): string[] => [
      ...oldLogs,
      `ℹ️ ${t("messageSendLog")}: ${JSON.stringify(payload, null, 2)}`
    ]);
  };

  // Connects to server when it's not case, otherwise disconnect.
  const toggleConnection = (): void => {
    // Whether socket connection is established.
    if (isConnected) {
      // Disconnects web socket instance.
      socket?.getSocketInstance()?.close();
      // Disables auto connection on view.
      autoConnect(false);
      // Sets connection state.
      connect(false);
      // Waits for few moments.
      window.setTimeout((): void => {
        // Prevents `message` event.
        socket?.setMessageCallback(null);
        // Prevents `error` event.
        socket?.setErrorCallback(null);
        // Prevents `close` event.
        socket?.setCloseCallback(null);
        // Prevents `open` event.
        socket?.setOpenCallback(null);
      }, 128);
    // Otherwise.
    } else {
      // Tries to establish a socket connection.
      try {
        // Whether a socket instance is done.
        if (socketUrl.length <= 0) return;
        // Updates socket instance.
        setSocket(new SocketManager({
          feedbackType: FeedbackType.NONE,
          autoConnect: isAutoConnect,
          url: socketUrl,
          verbose: true
        }));
      // An error occurred.
      } catch (error: unknown) {
        // Scrolls to full bottom.
        window.setTimeout((): void => scrollTo(SCROLL_BOTTOM_ID), 128);
        // Makes a log message.
        setLogs((oldLogs: string[]): string[] => [
          ...oldLogs, `❌ ${JSON.stringify({
            message: (error as Error).message,
            cause: (error as Error).cause,
            name: (error as Error).name
          }, null, 2)}`
        ]);
      }
    }
  };

  // Loads view data whether needed to improve UI experience.
  useEffect((): void => {
    // Whether no load is carry out.
    if (!isLoaded) loadData(); else saveData();
  // eslint-disable-next-line
  }, [isAutoConnect, socketUrl, isLoaded, message]);

  // Adjusts auto connection usage over current socket instance.
  useEffect((): void => {
    // Updates socket auto connection.
    socket?.autoConnection(isAutoConnect);
  // eslint-disable-next-line
  }, [isAutoConnect]);

  // Configures created socket instance to listen callback events.
  useEffect((): void => {
    // Listens connection failed event.
    socket?.setErrorCallback(onUnknownErrorOccurred);
    // Listens connection established event.
    socket?.setOpenCallback(onConnectionEstalished);
    // Listens incoming messages event.
    socket?.setMessageCallback(onMessageReceived);
    // Listens disconnection event.
    socket?.setCloseCallback(onConnectionClosed);
  // eslint-disable-next-line
  }, [socket]);

  // Builds tsx code.
  return <Section
    title = {t("appName")}
    children = {<Box
      boxShadow = "0 0 4px var(--chakra-colors-neutral-6)"
      backgroundColor = "success.50"
      borderColor = "success.500"
      borderRadius = {4}
      borderWidth = {1}
      width = "100%"
    >
      {/** Header */}
      <Flex
        onClick = {(): void => expand(!isExpanded)}
        borderBottomWidth = {isExpanded ? 1 : 0}
        borderBottomColor = "success.500"
        borderTopRightRadius = {4}
        borderTopLeftRadius = {4}
        alignItems = "center"
        paddingInline = {4}
        paddingBlock = {2}
        cursor = "pointer"
      >
        {/** Logo */}
        <Image src = {favicon} height = {4} width = {4}/>
        {/** Title */}
        <Text
          fontSize = {{base: 14, sm: 15, md: 16}}
          fontFamily = {SF_SEMI_BOLD}
          transition = "all .2s"
          marginLeft = {2}
          width = "100%"
        >{t("socketTester")}</Text>
        {/** Right */}
        <Icon
          transform = {`rotate(${isExpanded ? -90 : 0}deg)`}
          as = {MdArrowBackIosNew}
          height = {4}
          width = {4}
        />
      </Flex>
      {/** Body */}
      <Box display = {isExpanded ? "block" : "none"} padding = {4}>
        {/** Description */}
        <Text
          fontSize = {{base: 12, sm: 13, md: 14}}
          transition = "all .2s"
          color = "neutral.8"
        >{t("socketMonitoringDesc")}</Text>
        {/** Section title */}
        <TextWithLine
          containerStyle = {{marginBottom: 2, marginTop: 6}}
          text = {t("parameters")}
          textStyle = {{
            fontSize: {base: 13, sm: 14, md: 15},
            transition: "all .2s"
          }}
        />
        {/** Socket url */}
        <TextField
          {...getInputFieldCommonStyle()}
          onChange = {(value: string): void => setSocketUrl(value)}
          disabled = {isConnected}
          value = {socketUrl}
          fieldStyle = {{
            ...getInputFieldCommonStyle().fieldStyle,
            placeholder: t("socketUrlInputPlaceholder")
          }}
        />
        {/** Formulary */}
        <Flex
          justifyContent = "space-between"
          alignItems = "center"
          columnGap = {2}
          marginTop = {3}
        >
          {/** State */}
          <Flex columnGap = {{base: 1, md: 2}} alignItems = "center">
            {/** Point */}
            <Box
              backgroundColor = {isConnected ? "success.500" : "error.500"}
              height = {{base: 3, md: 4}}
              width = {{base: 3, md: 4}}
              transition = "all .2s"
              borderRadius = {32}
            />
            {/** Label */}
            <Text
              transform = {{base: "translateY(0)", md: "translateY(1px)"}}
              color = {isConnected ? "success.500" : "error.500"}
              fontSize = {{base: 12, sm: 13, md: 14}}
              fontFamily = {SF_MEDIUM}
              transition = "all .2s"
            >{t(isConnected ? "connected" : "disconnected")}</Text>
          </Flex>
          {/** Auto connection */}
          <Flex alignItems = "center" columnGap = {1}>
            {/** Label */}
            <Text>
              {t(
                windowWidth <= BREAKPOINT_480 ?
                "reconnection" : "autoConnection"
              )} :
            </Text>
            {/** Toggle */}
            <Switch.Root
              checked = {isAutoConnect}
              onCheckedChange = {(e: SwitchCheckedChangeDetails): void => (
                autoConnect(e.checked)
              )}
            >
              {/** Hidden input */}
              <Switch.HiddenInput/>
              {/** Switch controller */}
              <Switch.Control
                _checked = {{backgroundColor: "primary.600"}}
                backgroundColor = "neutral.6"
                transition = "all .2s"
              >
                {/** Radius thumb */}
                <Switch.Thumb/>
              </Switch.Control>
            </Switch.Root>
          </Flex>
        </Flex>
        {/** Validate button */}
        <CustomButton
          text = {t(isConnected ? "disconnect" : "establishConnection")}
          disabled = {socketUrl.trim().length <= 0}
          onClick = {toggleConnection}
          leftIcon = {
            isConnected ? undefined :
            <Icon as = {SiSocketdotio} height = {4} width = {4}/>
          }
          buttonStyle = {(disabled?: boolean): ButtonProps => ({
            borderColor: (disabled ? "neutral.6" : "transparent"),
            color: (disabled ? "neutral.7" : "neutral.1"),
            fontSize: {base: 12, sm: 13, md: 14},
            fontFamily: SF_SEMI_BOLD,
            borderRadius: 4,
            paddingBlock: 0,
            width: "100%",
            marginTop: 3,
            _hover: (disabled ? undefined : {
              backgroundColor: (isConnected ? "error.800" : "primary.800")
            }),
            backgroundColor: (
              disabled ? "neutral.4" :
              (isConnected ? "error.500" : "primary.500")
            )
          })}
        />
        {/** Message */}
        <TextField
          {...getInputFieldCommonStyle()}
          onChange = {(value: string): void => setMessage(value)}
          containerStyle = {{marginTop: 4}}
          disabled = {!isConnected}
          value = {message}
          fieldStyle = {{
            ...getInputFieldCommonStyle().fieldStyle,
            resize: (!isConnected ? "none" : "vertical"),
            placeholder: t("messageInputPlaceholder"),
            minHeight: "128px",
            maxHeight: "512px",
            as: "textarea"
          }}
        />
        {/** Send button */}
        <CustomButton
          leftIcon = {<Icon as = {MdOutlineSend} height = {4} width = {4}/>}
          disabled = {message.trim().length <= 0 || !isConnected}
          text = {t("sendMessage")}
          onClick = {emitMessage}
          buttonStyle = {(disabled?: boolean): ButtonProps => ({
            backgroundColor: (disabled ? "neutral.4" : "primary.500"),
            borderColor: (disabled ? "neutral.6" : "transparent"),
            _hover: (disabled ? undefined : {bg: "primary.800"}),
            color: (disabled ? "neutral.7" : "neutral.1"),
            fontSize: {base: 12, sm: 13, md: 14},
            fontFamily: SF_SEMI_BOLD,
            borderRadius: 4,
            paddingBlock: 0,
            width: "100%",
            marginTop: 3
          })}
        />
        {/** Logs header */}
        <Flex
          alignItems = "center"
          marginBottom = {3}
          columnGap = {3}
          marginTop = {3}
        >
          {/** Section title */}
          <TextWithLine
            text = {
              t(windowWidth <= BREAKPOINT_480 ? "output" : "outputLogs")
            }
            textStyle = {{
              fontSize: {base: 13, sm: 14, md: 15},
              transition: "all .2s"
            }}
          />
          {/** Clear terminal */}
          <CustomButton
            onClick = {(): void => setLogs([])}
            text = {t("clearTerminal")}
            buttonStyle = {(): ButtonProps => ({
              _hover: {borderColor: "primary.600", color: "primary.600"},
              fontSize: {base: 12, sm: 13, md: 14},
              backgroundColor: "neutral.1",
              borderColor: "neutral.5",
              fontFamily: SF_MEDIUM,
              color: "neutral.10",
              paddingInline: 4,
              borderRadius: 4,
              paddingBlock: 0
            })}
          />
        </Flex>
        {/** Terminal */}
        <Box width = "100%">
          {/** Logs */}
          <Box
            style = {{scrollbarWidth: "thin"}}
            backgroundColor = "neutral.10"
            scrollBehavior = "smooth"
            overflow = "auto"
            height = "320px"
            width = "100%"
            padding = {2}
          >
            {/** Iterating over logs */}
            {logs.filter((log: string): boolean => {
              // Whether information logs must be view.
              if (logDisplay?.value === t("showInformation")) {
                // Sends that message type only.
                return (log.startsWith('ℹ️') || log.startsWith('✅'));
              // Whether warning logs must be view.
              } else if (logDisplay?.value === t("showWarning")) {
                // Sends that message type only.
                return log.startsWith('⚠️');
              // Whether error logs must be view.
              } else if (logDisplay?.value === t("showError")) {
                // Sends that message type only.
                return log.startsWith('❌');
              // Otherwise.
              } else return true;
            // Materializes filtered log messages.
            }).map((log: string, index: number): ReactElement => <Box
              fontFamily = {SF_MONO_REGULAR}
              key = {index}
              color = {
                log.startsWith('⚠️') ? "warning.500" :
                (
                  log.startsWith('❌') ? "error.500" :
                  (log.startsWith('✅') ? "success.500" : "neutral.1")
                )
              }
            >
              {log}{
                index < (logs.length - 1) ? '' :
                <Box
                  animation = "terminal-cursor-blink 1s infinite"
                  className = "terminal-cursor"
                  color = "neutral.1"
                  as = "span"
                >█</Box>
              }
            </Box>)}
            {/** Scroll helper bottom target */}
            <Box id = {SCROLL_BOTTOM_ID.split('#')[1]}/>
          </Box>
          {/** Options */}
          <Flex
            justifyContent = "space-between"
            backgroundColor = "neutral.2"
            alignItems = "center"
            columnGap = {2}
            padding = {2}
          >
            {/** Left */}
            <Flex alignItems = "center" columnGap = {2}>
              {/** Information */}
              <Flex alignItems = "center" columnGap = {1}>
                {/** Icon */}
                <Icon as = {FcInfo}/>
                {/** Label */}
                <Text lineHeight = {0}>
                  {logs.filter((log: string): boolean => (
                    log.startsWith('ℹ️') || log.startsWith('✅')
                  )).length}
                </Text>
              </Flex>
              {/** Warning */}
              <Flex alignItems = "center" columnGap = {1}>
                {/** Icon */}
                <Icon color = "warning.500" as = {PiWarningFill}/>
                {/** Label */}
                <Text lineHeight = {0}>
                  {logs.filter(
                    (log: string): boolean => log.startsWith('⚠️')
                  ).length}
                </Text>
              </Flex>
              {/** Error */}
              <Flex alignItems = "center" columnGap = {1}>
                {/** Icon */}
                <Icon color = "error.500" as = {MdError}/>
                {/** Label */}
                <Text lineHeight = {0}>
                  {logs.filter(
                    (log: string): boolean => log.startsWith('❌')
                  ).length}
                </Text>
              </Flex>
            </Flex>
            {/** Right */}
            <Dropdown
              triggerStyle = {{height: "32px", minHeight: 0}}
              value = {logDisplay?.value}
              clearable = {false}
              onChange = {
                (value: DropdownData<unknown>): void => setLogoDisplay(value)
              }
              rootSelectStyle = {(
                options: ListCollection<DropdownData<unknown>>
              ): SelectRootProps => ({collection: options, width: "256px"})}
              options = {[
                {value: t("showInformation"), key: t("showInformation")},
                {value: t("showWarning"), key: t("showWarning")},
                {value: t("showAllLogs"), key: t("showAllLogs")},
                {value: t("showError"), key: t("showError")}
              ]}
            />
          </Flex>
        </Box>
      </Box>
    </Box>}
  />;
}
